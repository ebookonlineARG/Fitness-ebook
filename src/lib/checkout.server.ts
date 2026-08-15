/**
 * Server-only Mercado Pago + fulfillment helpers.
 * Never imported from client code (blocked by *.server filename convention).
 */
import { ebooks } from "./funnel-data";

export const PRODUCT_TITLE = "Pack Definitivo Pérdida de Peso (6 E-books)";
export const UNIT_PRICE = 22000;

export type PreferenceResult = { initPoint: string; preferenceId: string; externalReference: string };

function mpToken() {
  const token = process.env["MERCADOPAGO_ACCESS_TOKEN"];
  if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN no está configurado");
  return token;
}

export async function createPreference(opts: {
  origin: string;
  email?: string;
  externalReference: string;
}): Promise<PreferenceResult> {
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
        success: `${opts.origin}/thank-you?ref=${opts.externalReference}`,
        pending: `${opts.origin}/thank-you?ref=${opts.externalReference}`,
        failure: `${opts.origin}/?pago=fallido`,
      },
      auto_return: "approved",
      notification_url: `${opts.origin}/api/public/webhooks/mercadopago`,
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

/** Storage paths of the 6 PDFs inside the private `ebooks` bucket. */
export const pdfPaths = ebooks.map((book) => `${book.id}.pdf`);

export async function signDownloadUrls(): Promise<{ title: string; url: string | null }[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return Promise.all(
    ebooks.map(async (book, index) => {
      const { data } = await supabaseAdmin.storage
        .from("ebooks")
        .createSignedUrl(pdfPaths[index]!, 60 * 60 * 24 * 7);
      return { title: book.title, url: data?.signedUrl ?? null };
    }),
  );
}

export async function sendDeliveryEmail(email: string, links: { title: string; url: string | null }[]) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey || !email) return false;
  const from = process.env["RESEND_FROM_EMAIL"] ?? "onboarding@resend.dev";
  const items = links
    .filter((link) => link.url)
    .map((link) => `<li><a href="${link.url}">${link.title}</a></li>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Tu Pack Definitivo de Pérdida de Peso (6 e-books)",
      html: `<h2>¡Gracias por tu compra!</h2><p>Acá están tus 6 e-books en PDF:</p><ul>${items}</ul><p>Los links vencen en 7 días. Descargalos y guardalos.</p>`,
    }),
  });
  return res.ok;
}
