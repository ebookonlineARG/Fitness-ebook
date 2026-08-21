import { useEffect, useState } from "react";
import { CtaButton } from "./CtaButton";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
      <CtaButton
        label="COMPRAR EL PACK · $22.000 ARS"
        subtext="Pago único · Garantía 7 días"
        pulse={false}
        location="sticky_movil"
      />
    </div>
  );
}
