import { motion } from "motion/react";
import { AlertTriangle, Check } from "lucide-react";
import cover from "@/assets/ebook-1.png";

const truths = [
  "Los mitos fitness que te vendieron como “ciencia” y frenan tus resultados.",
  "Cómo el estrés crónico y el cortisol te hacen retener grasa aunque comas poco.",
  "La trampa de los ultraprocesados “light”: por qué te dan hambre a las 2 horas.",
  "Qué hacer cuando la balanza no se mueve pero tu cuerpo sí está cambiando.",
];

export function TruthSection() {
  return (
    <section className="px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-danger/40 bg-danger/10 p-6 sm:p-10"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-danger px-3 py-1 text-xs font-bold uppercase tracking-wider text-danger-foreground">
          <AlertTriangle className="size-3.5" /> Libro principal
        </span>

        <div className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_260px]">
          <div>
            <h2 className="text-2xl font-black sm:text-4xl">La Verdad Agridulce de Perder Peso</h2>
            <p className="mt-4 text-muted-foreground">
              No es otro libro de recetas ni un plan de 21 días. Es la explicación honesta de por
              qué seguís estancado: la industria te vendió déficit calórico como única variable,
              mientras el estrés, el sueño roto, las hormonas y los alimentos diseñados para que
              comas más te mantienen exactamente donde estás.
            </p>
            <ul className="mt-6 space-y-3">
              {truths.map((truth) => (
                <li key={truth} className="flex gap-3 text-sm sm:text-base">
                  <Check className="mt-0.5 size-5 shrink-0 text-success" />
                  <span>{truth}</span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={cover}
            alt="Portada del e-book La Verdad Agridulce de Perder Peso"
            loading="lazy"
            width={768}
            height={1024}
            className="mx-auto w-44 drop-shadow-2xl md:w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
