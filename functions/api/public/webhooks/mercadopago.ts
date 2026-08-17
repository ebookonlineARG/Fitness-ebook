interface Env {
  MERCADOPAGO_ACCESS_TOKEN?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

type Notification = {
  type?: string;
  action?: string;
  data?: { id?: string | number };
  id?: string | number;
  topic?: string;
  resource?: string;
};

async function handleWebhook(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const token = env.MERCADOPAGO_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN;
  const supabaseUrl = env.SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

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

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing MP Token" }), { status: 500 });
  }

  // Fetch payment status directly from Mercado Pago API
  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!mpRes.ok) {
    return new Response(JSON.stringify({ ok: false }), { status: 200 });
  }

  const payment = (await mpRes.json()) as {
    id: number | string;
    status: string;
    external_reference?: string | null;
    transaction_amount?: number;
    payer?: { email?: string | null } | null;
  };

  const ref = payment.external_reference ?? null;
  const email = payment.payer?.email ?? null;

  if (supabaseUrl && supabaseKey && ref) {
    try {
      const update = {
        status: payment.status,
        payment_id: String(payment.id),
        ...(email ? { email } : {}),
        ...(payment.transaction_amount ? { amount: payment.transaction_amount } : {}),
      };

      await fetch(`${supabaseUrl}/rest/v1/orders?external_reference=eq.${encodeURIComponent(ref)}`, {
        method: "PATCH",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(update),
      });
    } catch (err) {
      console.warn("Supabase webhook update error:", err);
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost = handleWebhook;
export const onRequestGet = handleWebhook;
