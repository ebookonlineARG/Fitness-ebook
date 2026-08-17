import { motion } from "motion/react";
import { GraduationCap, Users, BookOpen } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "8 años", label: "como profesor de educación física" },
  { icon: Users, value: "+800", label: "alumnos entrenados" },
  { icon: BookOpen, value: "95 páginas", label: "en 6 manuales prácticos" },
];

export function Author() {
  return (
    <section className="px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
        className="surface-card mx-auto grid max-w-5xl items-center gap-8 p-6 sm:p-10 md:grid-cols-[280px_1fr]"
      >
        <img
          src="/images/autor-alejandro.jpg"
          alt="Alejandro Gómez, profesor de educación física y autor de los 6 e-books"
          loading="lazy"
          width={1024}
          height={1024}
          className="mx-auto w-56 rounded-2xl object-cover shadow-hard md:w-full"
        />

        <div>
          <span className="inline-block rounded-full border border-success/40 bg-success/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success">
            Quién escribió los libros
          </span>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">Prof. Alejandro Gómez</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            “Soy profesor de educación física desde hace 8 años. Después de estudiar y ver tanta
            información falsa en el fitness, creé estos manuales para mostrarte la realidad: las
            soluciones mágicas no existen. Aquí tienes el método real y directo para aplicar hoy
            mismo.”
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-border bg-surface p-4 text-center"
              >
                <stat.icon className="mx-auto size-5 text-success" />
                <dt className="mt-2 font-display text-xl">{stat.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
