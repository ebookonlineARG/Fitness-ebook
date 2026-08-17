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

    try {
      await supabaseAdmin.from("orders").insert({
        email: data.email ?? null,
        preference_id: preference.preferenceId,
        external_reference: externalReference,
        status: "pending",
      });
    } catch (err) {
      console.warn("[Checkout] Supabase order tracking error (non-fatal):", err);
    }

    return { initPoint: preference.initPoint, ref: externalReference };
  });
