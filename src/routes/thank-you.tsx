import { useEffect } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Clock, Download, Loader2, Mail } from "lucide-react";
import { z } from "zod";

import { getOrderAccess } from "@/lib/checkout.functions";
import { OFFER_PRICE } from "@/lib/funnel-data";
import { trackPurchase } from "@/lib/tracking";

const TITLE = "¡Compra confirmada! Descargá tus 6 e-books";
const DESCRIPTION =
  "Acceso inmediato a los 6 e-books en PDF del Pack Definitivo de Pérdida de Peso. Descargalos acá o revisá tu email.";

export const Route = createFileRoute("/thank-you")({
  validateSearch: z.object({
    ref: z.string().optional(),
    session_id: z.string().optional(),
    payment_id: z.string().optional(),
  }),
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
  const { ref, session_id } = useSearch({ from: "/thank-you" });
  const reference = ref ?? session_id;
  const fetchAccess = useServerFn(getOrderAccess);

  const { data, isPending } = useQuery({
    queryKey: ["order-access", reference],
    enabled: Boolean(reference),
    refetchInterval: (query) => (query.state.data?.status === "approved" ? false : 4000),
    queryFn: () => fetchAccess({ data: { ref: reference! } }),
  });

  const approved = data?.status === "approved";

  useEffect(() => {
    if (approved) trackPurchase(data?.amount ?? OFFER_PRICE);
  }, [approved, data?.amount]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16">
      <div className="surface-card p-7 sm:p-10">
        {approved ? (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="mt-5 text-2xl font-black sm:text-4xl">¡Listo! Tu pack está desbloqueado</h1>
            <p className="mt-3 text-muted-foreground">
              Descargá los 6 e-books ahora. También te los enviamos por email para que los tengas
              siempre a mano.
            </p>

            <div className="mt-7 space-y-3">
              {data.downloads.map((item) =>
                item.url ? (
                  <a
                    key={item.title}
                    href={item.url}
                    className="flex items-center justify-between gap-3 rounded-xl bg-success px-4 py-3 text-sm font-bold text-success-foreground transition-transform hover:scale-[1.01]"
                  >
                    <span>Descargar E-book en PDF: {item.title}</span>
                    <Download className="size-4 shrink-0" />
                  </a>
                ) : (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs">Preparando archivo…</span>
                  </div>
                ),
              )}
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="size-3.5" /> Revisá tu casilla (y spam) si no ves el email en 5 minutos.
            </p>
          </>
        ) : (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-surface-2 text-success">
              {isPending ? <Loader2 className="size-7 animate-spin" /> : <Clock className="size-7" />}
            </span>
            <h1 className="mt-5 text-2xl font-black sm:text-3xl">Estamos confirmando tu pago</h1>
            <p className="mt-3 text-muted-foreground">
              {reference
                ? "Mercado Pago puede tardar algunos segundos en acreditar la operación. Dejá esta página abierta: los enlaces de descarga aparecen automáticamente."
                : "No encontramos la referencia de tu compra. Si ya pagaste, revisá tu email o escribinos."}
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex rounded-xl border border-border px-4 py-2 text-sm font-semibold"
            >
              Volver al inicio
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
