import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Download, Loader2, ShieldCheck } from "lucide-react";

import { ebookFiles } from "@/lib/ebook-files";
import { OFFER_PRICE } from "@/lib/funnel-data";
import { trackPurchase } from "@/lib/tracking";

const TITLE = "¡Compra confirmada! Descargá tus 6 e-books";
const DESCRIPTION =
  "Acceso inmediato a los 6 e-books en PDF del Pack Definitivo de Pérdida de Peso.";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      const currentUrl = window.location.search;
      if (!currentUrl) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/verify-payment${currentUrl}`);
        const data = (await response.json()) as { valid: boolean; paymentId?: string };

        if (data.valid) {
          setApproved(true);
          setPaymentId(data.paymentId || null);
          trackPurchase(OFFER_PRICE);
        } else {
          setApproved(false);
        }
      } catch {
        setApproved(false);
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-16">
        <div className="surface-card flex flex-col items-center p-10 text-center">
          <Loader2 className="size-10 animate-spin text-success" />
          <p className="mt-4 font-semibold text-muted-foreground">
            Verificando la autenticidad de tu compra con Mercado Pago...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16">
      <div className="surface-card p-7 sm:p-10">
        {approved ? (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-success/20 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="mt-5 text-2xl font-black sm:text-4xl">
              ¡Felicitaciones! Tu pago fue verificado
            </h1>
            <p className="mt-3 text-muted-foreground">
              Confirmamos tu compra {paymentId ? `(pago #${paymentId})` : ""}. Descargá los 6 e-books en PDF directamente desde los botones de abajo:
            </p>

            <div className="mt-7 space-y-3">
              {ebookFiles.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  download
                  className="flex items-center justify-between gap-3 rounded-xl bg-success px-4 py-3 text-sm font-black text-success-foreground transition-transform hover:scale-[1.01]"
                >
                  <span>
                    Descargar PDF: {item.title}{" "}
                    {item.pages && <span className="font-semibold opacity-70">({item.pages})</span>}
                  </span>
                  <Download className="size-4 shrink-0" />
                </a>
              ))}
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" /> Garantía de 7 días incluida.
            </p>
          </>
        ) : (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-danger/20 text-danger">
              <AlertTriangle className="size-7" />
            </span>
            <h1 className="mt-5 text-2xl font-black sm:text-3xl">Acceso Denegado</h1>
            <p className="mt-3 text-muted-foreground">
              No pudimos validar un pago aprobado para esta transacción. Si realizaste la compra hace instantes, aguardá unos minutos a que Mercado Pago procese la solicitud.
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex rounded-xl bg-success px-5 py-3 text-sm font-black text-success-foreground"
            >
              Volver al inicio
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
