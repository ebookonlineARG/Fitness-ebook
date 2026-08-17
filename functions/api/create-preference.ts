interface Env {
  MERCADOPAGO_ACCESS_TOKEN?: string;
  PUBLIC_SITE_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const token = context.env.MERCADOPAGO_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!token) {
      return new Response(
        JSON.stringify({
          error: "MERCADOPAGO_ACCESS_TOKEN no está configurado en las variables de entorno de Cloudflare Pages.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    let origin = context.env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL;
    let email: string | undefined;

    try {
      const body = (await context.request.json()) as { origin?: string; email?: string };
      if (body?.origin && !origin) origin = body.origin;
      if (body?.email) email = body.email;
    } catch {
      // json body optional
    }

    if (!origin) {
      const reqUrl = new URL(context.request.url);
      origin = reqUrl.origin;
    }

    const externalReference = crypto.randomUUID();

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: "pack-6-ebooks",
            title: "Pack Definitivo Pérdida de Peso (6 E-books)",
            description: "6 e-books en PDF · acceso inmediato",
            quantity: 1,
            unit_price: 22000,
            currency_id: "ARS",
          },
        ],
        ...(email ? { payer: { email } } : {}),
        external_reference: externalReference,
        statement_descriptor: "PACK EBOOKS",
        back_urls: {
          success: `${origin}/thank-you`,
          failure: `${origin}/?status=failure`,
          pending: `${origin}/?status=pending`,
        },
        auto_return: "approved",
        notification_url: `${origin}/api/public/webhooks/mercadopago`,
      }),
    });

    const mpData = (await mpRes.json()) as { id?: string; init_point?: string; message?: string };

    if (!mpRes.ok || !mpData.init_point || !mpData.id) {
      return new Response(
        JSON.stringify({
          error: mpData.message ?? "Error al crear la preferencia en Mercado Pago",
          details: mpData,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Optionally register in Supabase
    const supabaseUrl = context.env.SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = context.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/orders`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            email: email ?? null,
            preference_id: String(mpData.id),
            external_reference: externalReference,
            status: "pending",
          }),
        });
      } catch (e) {
        console.warn("Supabase record failed (non-blocking):", e);
      }
    }

    return new Response(
      JSON.stringify({
        initPoint: mpData.init_point,
        preferenceId: String(mpData.id),
        ref: externalReference,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message ?? "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
