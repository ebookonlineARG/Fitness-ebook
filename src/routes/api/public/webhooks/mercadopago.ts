import { createFileRoute } from "@tanstack/react-router";

type Notification = {
  type?: string;
  action?: string;
  data?: { id?: string | number };
  id?: string | number;
  topic?: string;
  resource?: string;
};

async function handle(request: Request) {
  const url = new URL(request.url);
  let body: Notification = {};
  try {
    body = (await request.json()) as Notification;
  } catch {
    body = {};
  }

  const type = body.type ?? body.topic ?? url.searchParams.get("type") ?? "";
  const paymentId = String(
    body.data?.id ?? body.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? "",
  );

  if (!paymentId || !type.startsWith("payment")) {
    return new Response(JSON.stringify({ ignored: true }), { status: 200 });
  }

  const { getPayment } = await import("@/lib/checkout.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Source of truth is Mercado Pago's API, never the webhook payload.
  const payment = await getPayment(paymentId);
  if (!payment) return new Response(JSON.stringify({ ok: false }), { status: 200 });

  const ref = payment.external_reference ?? null;
  const email = payment.payer?.email ?? null;

  const update = {
    status: payment.status,
    payment_id: String(payment.id),
    ...(email ? { email } : {}),
    ...(payment.transaction_amount ? { amount: payment.transaction_amount } : {}),
  };

  let orderId: string | null = null;
  if (ref) {
    const { data } = await supabaseAdmin
      .from("orders")
      .update(update)
      .eq("external_reference", ref)
      .select("id, email, email_sent")
      .maybeSingle();
    orderId = data?.id ?? null;

    if (!orderId) {
      const { data: inserted } = await supabaseAdmin
        .from("orders")
        .insert({ ...update, external_reference: ref })
        .select("id")
        .maybeSingle();
      orderId = inserted?.id ?? null;
    }
  }

  if (payment.status === "approved" && email && orderId) {
    const downloads = await signDownloadUrls();
    const sent = await sendDeliveryEmail(email, downloads);
    if (sent) await supabaseAdmin.from("orders").update({ email_sent: true }).eq("id", orderId);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/webhooks/mercadopago")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
      GET: ({ request }) => handle(request),
    },
  },
});
