import { motion } from "motion/react";
import { CheckCheck } from "lucide-react";
import { testimonials } from "@/lib/funnel-data";

export function Testimonials() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-black sm:text-4xl">Lo que dicen quienes ya lo leyeron</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Mensajes reales de lectores en Argentina. Adherencia, claridad mental y resultados
          sostenibles.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="surface-card p-4"
            >
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-success/20 font-bold text-success">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold normal-case tracking-normal">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.city} · en línea</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {item.messages.map((message) => (
                  <p
                    key={message}
                    className="relative rounded-2xl rounded-br-sm bg-success/15 px-3 py-2 text-sm"
                  >
                    {message}
                    <CheckCheck className="ml-1 inline size-3.5 align-baseline text-success" />
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
