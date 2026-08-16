import { motion } from "motion/react";
import { Check, FileText } from "lucide-react";
import { ebooks, formatARS, OFFER_PRICE } from "@/lib/funnel-data";

export function BundleGrid() {
  return (
    <section id="pack" className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-black sm:text-4xl">
          Todo lo que recibís hoy{" "}
          <span className="text-gradient-green text-shadow-heading">(6 e-books)</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Comprás el libro principal y los otros 5 se suman gratis. Sin upsells escondidos.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ebooks.map((book, index) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: (index % 3) * 0.05 }}
              className="surface-card flex flex-col p-5 transition-colors hover:border-success/50"
            >
              <div className="flex items-start gap-4">
                <img
                  src={book.cover}
                  alt={`Portada de ${book.title}`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="w-20 shrink-0 drop-shadow-xl"
                />
                <div>
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      book.isMain
                        ? "bg-danger/20 text-danger"
                        : "bg-success/15 text-success"
                    }`}
                  >
                    {book.isMain ? "Producto principal" : `Bonus ${index}`}
                  </span>
                  <h3 className="mt-2 text-sm font-bold normal-case tracking-normal sm:text-base">
                    {book.title}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <FileText className="size-3.5" /> PDF · {book.pages}
                  </p>
                </div>
              </div>

              <ul className="mt-4 flex-1 space-y-2">
                {book.chapters.map((chapter) => (
                  <li key={chapter} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    {chapter}
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Precio normal
                    </span>
                    <span className="price-old text-sm">{formatARS(book.value)}</span>
                  </span>
                  <span className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-success">
                      Hoy
                    </span>
                    <span className="price-now text-xl">
                      {book.isMain ? formatARS(OFFER_PRICE) : "GRATIS"}
                    </span>
                  </span>
                </div>
                <span className="save-badge mt-3">
                  Ahorrás {formatARS(book.isMain ? book.value - OFFER_PRICE : book.value)}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
