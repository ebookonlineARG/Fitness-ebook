import { BadgeCheck, Download, Lock, ShieldCheck } from "lucide-react";

const badges = [
  { icon: Lock, label: "Conexión SSL segura" },
  { icon: BadgeCheck, label: "Pago vía Mercado Pago" },
  { icon: Download, label: "Descarga PDF inmediata" },
];

export function Guarantee() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-3xl surface-card p-7 text-center sm:p-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
          <ShieldCheck className="size-8" />
        </span>
        <h2 className="mt-5 text-2xl font-black sm:text-3xl">Garantía de 7 días</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          “Si no aprendés algo nuevo que transforme tu perspectiva, te devolvemos el 100% de tu
          dinero.” Sin formularios eternos ni preguntas incómodas: escribinos y listo.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs font-semibold text-muted-foreground sm:text-sm"
            >
              <badge.icon className="size-4 text-success" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
