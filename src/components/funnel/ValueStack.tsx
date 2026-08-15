import { motion } from "motion/react";
import { BONUS_VALUE, formatARS, MAIN_PRICE, OFFER_PRICE, TOTAL_VALUE } from "@/lib/funnel-data";
import { CtaButton } from "./CtaButton";

const rows = [
  { label: "E-book principal: La Verdad Agridulce de Perder Peso", from: MAIN_PRICE, to: formatARS(OFFER_PRICE) },
  { label: "5 e-books bonus (nutrición, casa, gym, cardio, sueño)", from: BONUS_VALUE, to: "$0 ARS" },
];

export function ValueStack() {
  return (
    <section className="px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl rounded-3xl border-2 border-success/50 bg-surface p-6 shadow-glow-green sm:p-9"
      >
        <h2 className="text-center text-2xl font-black sm:text-3xl">Lo que pagás vs. lo que vale</h2>

        <dl className="mt-7 divide-y divide-border">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-4 py-4">
              <dt className="text-sm sm:text-base">{row.label}</dt>
              <dd className="shrink-0 text-right">
                <span className="block text-xs text-muted-foreground line-through">
                  {formatARS(row.from)}
                </span>
                <span className="font-display text-lg text-success">{row.to}</span>
              </dd>
            </div>
          ))}
          <div className="flex items-center justify-between py-4">
            <dt className="text-sm font-bold uppercase sm:text-base">Valor total del pack</dt>
            <dd className="font-display text-xl text-muted-foreground line-through">
              {formatARS(TOTAL_VALUE)}
            </dd>
          </div>
        </dl>

        <div className="mt-2 rounded-2xl bg-success/15 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-success">
            Precio de oferta hoy
          </p>
          <p className="mt-1 font-display text-4xl text-success sm:text-5xl">
            {formatARS(OFFER_PRICE)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Ahorrás {formatARS(TOTAL_VALUE - OFFER_PRICE)} (81% off)</p>
        </div>

        <div className="mt-6">
          <CtaButton label="QUIERO EL PACK COMPLETO AHORA" />
        </div>
      </motion.div>
    </section>
  );
}
