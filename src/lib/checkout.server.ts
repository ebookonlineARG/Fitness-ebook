/**
 * Server-only Mercado Pago helpers.
 * Never imported from client code (blocked by *.server filename convention).
 */

export const PRODUCT_TITLE = "Pack Definitivo Pérdida de Peso (6 E-books)";
export const UNIT_PRICE = 22000;

export type PreferenceResult = {
  initPoint: string;
  preferenceId: string;
  externalReference: string;
};

function mpToken() {
  const token = process.env["MERCADOPAGO_ACCESS_TOKEN"];
  if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN no está configurado");
  return token;
}

function siteUrl(origin: string) {
  return process.env["PUBLIC_SITE_URL"] ?? origin;
}

export async function createPreference(opts: {
  origin: string;
  email?: string;
  externalReference: string;
}): Promise<PreferenceResult> {
  const base = siteUrl(opts.origin);

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mpToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: "pack-6-ebooks",
          title: PRODUCT_TITLE,
          description: "6 e-books en PDF · acceso inmediato",
          quantity: 1,
          unit_price: UNIT_PRICE,
          currency_id: "ARS",
        },
      ],
      ...(opts.email ? { payer: { email: opts.email } } : {}),
      external_reference: opts.externalReference,
      statement_descriptor: "PACK EBOOKS",
      back_urls: {
        success: `${base}/thank-you`,
        failure: `${base}/?status=failure`,
        pending: `${base}/?status=pending`,
      },
      auto_return: "approved",
      notification_url: `${base}/api/public/webhooks/mercadopago`,
    }),
  });

  const body = (await res.json()) as { id?: string; init_point?: string; message?: string };
  if (!res.ok || !body.init_point || !body.id) {
    throw new Error(body.message ?? "No se pudo crear el checkout de Mercado Pago");
  }
  return {
    initPoint: body.init_point,
    preferenceId: String(body.id),
    externalReference: opts.externalReference,
  };
}

export type MpPayment = {
  id: number | string;
  status: string;
  external_reference?: string | null;
  transaction_amount?: number;
  payer?: { email?: string | null } | null;
};

export async function getPayment(paymentId: string): Promise<MpPayment | null> {
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${mpToken()}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as MpPayment;
}
