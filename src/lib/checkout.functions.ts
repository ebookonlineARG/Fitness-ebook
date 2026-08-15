import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ email: z.string().email().optional(), origin: z.string().url() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { createPreference } = await import("./checkout.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const externalReference = crypto.randomUUID();
    const preference = await createPreference({
      origin: data.origin,
      ...(data.email ? { email: data.email } : {}),
      externalReference,
    });

    await supabaseAdmin.from("orders").insert({
      email: data.email ?? null,
      preference_id: preference.preferenceId,
      external_reference: externalReference,
      status: "pending",
    });

    return { initPoint: preference.initPoint, ref: externalReference };
  });

export const getOrderAccess = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ ref: z.string().min(6) }).parse(input))
  .handler(async ({ data }) => {
    const { signDownloadUrls, getPayment, sendDeliveryEmail } = await import("./checkout.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("id, status, email, payment_id, amount")
      .eq("external_reference", data.ref)
      .maybeSingle();

    if (!order) return { status: "not_found" as const, downloads: [] };

    let status = order.status;

    // Fallback confirmation in case the webhook has not arrived yet.
    if (status !== "approved" && order.payment_id) {
      const payment = await getPayment(order.payment_id);
      if (payment?.status === "approved") {
        status = "approved";
        await supabaseAdmin.from("orders").update({ status }).eq("id", order.id);
      }
    }

    if (status !== "approved") return { status: status as string, downloads: [] };

    const downloads = await signDownloadUrls();
    if (order.email) {
      const sent = await sendDeliveryEmail(order.email, downloads);
      if (sent) await supabaseAdmin.from("orders").update({ email_sent: true }).eq("id", order.id);
    }

    return { status: "approved" as const, downloads, amount: Number(order.amount) };
  });
