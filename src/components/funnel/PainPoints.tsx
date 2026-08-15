import { motion } from "motion/react";
import { Dumbbell, Moon, Repeat, Scale, type LucideIcon } from "lucide-react";
import { painPoints } from "@/lib/funnel-data";

const icons: Record<string, LucideIcon> = { scale: Scale, moon: Moon, dumbbell: Dumbbell, repeat: Repeat };

export function PainPoints() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-black sm:text-4xl">¿Te sentís identificado con esto?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Si marcás dos o más, el problema no es tu fuerza de voluntad. Es la información que te
          dieron.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {painPoints.map((item, index) => {
            const Icon = icons[item.icon] ?? Scale;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="surface-card flex gap-4 p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-danger/15 text-danger">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold tracking-normal normal-case sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
