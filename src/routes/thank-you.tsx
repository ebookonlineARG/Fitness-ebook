import { useEffect } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Download, ShieldCheck } from "lucide-react";
import { z } from "zod";

import { ebookFiles } from "@/lib/ebook-files";
import { OFFER_PRICE } from "@/lib/funnel-data";
import { trackPurchase } from "@/lib/tracking";

const TITLE = "¡Compra confirmada! Descargá tus 6 e-books";
const DESCRIPTION =
  "Acceso inmediato a los 6 e-books en PDF del Pack Definitivo de Pérdida de Peso. Descargalos directamente desde esta página.";

// Acepta tanto string como number para IDs y status que Mercado Pago/TanStack Router puedan transformar
const searchSchema = z
  .object({
    status: z.union([z.string(), z.number()]).optional(),
    collection_status: z.union([z.string(), z.number()]).optional(),
    collection_id: z.union([z.string(), z.number()]).optional(),
    payment_id: z.union([z.string(), z.number()]).optional(),
    ref: z.string().optional(),
  })
  .passthrough();

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const search = useSearch({ from: "/thank-you" });

  const paymentId = search.collection_id
    ? String(search.collection_id)
    : search.payment_id
      ? String(search.payment_id)
      : null;

  const status = search.status
    ? String(search.status)
    : search.collection_status
      ? String(search.collection_status)
      : null;

  const approved = status === "approved";

  useEffect(() => {
    if (approved) trackPurchase(OFFER_PRICE);
  }, [approved]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16">
      <div className="surface-card p-7 sm:p-10">
        {approved ? (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-success/20 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="mt-5 text-2xl font-black sm:text-4xl">
              ¡Felicitaciones! Tu pago fue aprobado
            </h1>
            <p className="mt-3 text-muted-foreground">
              Tu compra está confirmada {paymentId ? `(pago #${paymentId})` : ""}. Descargá los 6 e-books en PDF ahora
              mismo desde los botones de abajo. Guardalos en tu celular o compu: el acceso es de por
              vida.
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
              <ShieldCheck className="size-3.5 text-success" /> Garantía de 7 días. Si algo no te
              cierra, te devolvemos el 100%.
            </p>
          </>
        ) : (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-danger/20 text-danger">
              <AlertTriangle className="size-7" />
            </span>
            <h1 className="mt-5 text-2xl font-black sm:text-3xl">No detectamos un pago válido</h1>
            <p className="mt-3 text-muted-foreground">
              Esta página muestra las descargas solo cuando Mercado Pago confirma el pago como
              aprobado. Si tu pago quedó pendiente, esperá unos minutos y volvé a entrar desde el
              mail de Mercado Pago. Si todavía no compraste, podés hacerlo desde la página
              principal.
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex rounded-xl bg-success px-5 py-3 text-sm font-black text-success-foreground"
            >
              Ir a la página de compra
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
