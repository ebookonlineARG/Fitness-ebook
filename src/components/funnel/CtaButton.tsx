import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { startCheckout } from "@/lib/checkout.functions";
import { trackInitiateCheckout } from "@/lib/tracking";
import { OFFER_PRICE } from "@/lib/funnel-data";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  subtext?: string;
  className?: string;
  pulse?: boolean;
};

export function CtaButton({
  label = "¡SÍ, QUIERO MI PACK COMPLETO POR $22.000 ARS!",
  subtext = "Pago único • Acceso inmediato • Garantía de 7 días",
  className,
  pulse = true,
}: Props) {
  const checkout = useServerFn(startCheckout);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    trackInitiateCheckout(OFFER_PRICE);
    try {
      const result = await checkout({ data: { origin: window.location.origin } });
      window.location.href = result.initPoint;
    } catch {
      toast.error("No pudimos abrir el checkout", {
        description: "Volvé a intentar en unos segundos o escribinos por WhatsApp.",
      });
      setLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "w-full rounded-xl bg-success px-5 py-4 text-center font-display text-lg tracking-wide text-success-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-100 disabled:opacity-70 sm:text-2xl",
          pulse && "cta-pulse",
        )}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-5 animate-spin" /> Abriendo checkout seguro...
          </span>
        ) : (
          label
        )}
      </button>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5 text-success" />
        {subtext}
      </p>
    </div>
  );
}
