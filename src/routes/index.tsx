import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { AnnouncementBar } from "@/components/funnel/AnnouncementBar";
import { Hero } from "@/components/funnel/Hero";
import { PainPoints } from "@/components/funnel/PainPoints";
import { TruthSection } from "@/components/funnel/TruthSection";
import { BundleGrid } from "@/components/funnel/BundleGrid";
import { ValueStack } from "@/components/funnel/ValueStack";
import { Author } from "@/components/funnel/Author";
import { Testimonials } from "@/components/funnel/Testimonials";
import { Guarantee } from "@/components/funnel/Guarantee";
import { Faq } from "@/components/funnel/Faq";
import { Footer } from "@/components/funnel/Footer";
import { StickyCta } from "@/components/funnel/StickyCta";
import { trackPageView } from "@/lib/tracking";

const TITLE = "Pack Definitivo Pérdida de Peso — 6 E-books por $22.000";
const DESCRIPTION =
  "Descubrí por qué las dietas tradicionales fallan y desbloqueá tu metabolismo con 6 guías prácticas en PDF. Pago único, acceso inmediato y garantía de 7 días.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <main>
      <AnnouncementBar />
      <Hero />
      <PainPoints />
      <TruthSection />
      <BundleGrid />
      <ValueStack />
      <Author />
      <Testimonials />
      <Guarantee />
      <Faq />
      <Footer />
      <StickyCta />
    </main>
  );
}
