import { motion } from "motion/react";
import { Star } from "lucide-react";
import heroBundle from "@/assets/hero-bundle.png";
import { CtaButton } from "./CtaButton";
import { formatARS, MAIN_PRICE, OFFER_PRICE, TOTAL_VALUE } from "@/lib/funnel-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-10 pb-14 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-success/15 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-sm font-extrabold uppercase tracking-wide text-danger sm:text-base">
            Para quienes ya intentaron de todo y siguen aumentando de peso...
          </p>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">
            Por qué las dietas tradicionales fallan y cómo{" "}
            <span className="text-gradient-green">desbloquear tu metabolismo</span> definitivamente
            (sin dietas de hambre ni pastillas)
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Un sistema directo, sin rodeos y respaldado por la ciencia en 6 guías prácticas que te
            dicen la verdad incómoda y te dan herramientas que SÍ funcionan.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-muted-foreground line-through">
              Valor real {formatARS(TOTAL_VALUE)}
            </span>
            <span className="rounded-full bg-success/15 px-3 py-1 font-bold text-success">
              Hoy {formatARS(OFFER_PRICE)}
            </span>
            <span className="text-muted-foreground">
              (libro principal {formatARS(MAIN_PRICE)} + 5 bonus gratis)
            </span>
          </div>

          <div className="mt-7 max-w-xl">
            <CtaButton />
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" />
              ))}
            </span>
            +2.400 lectores en Argentina
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="surface-card p-4 sm:p-8">
            <img
              src={heroBundle}
              alt="Pack de 6 e-books en PDF sobre pérdida de peso, nutrición y entrenamiento"
              width={1280}
              height={1024}
              className="mx-auto w-full max-w-lg drop-shadow-2xl"
            />
            <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
              6 e-books en PDF · descarga inmediata
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
