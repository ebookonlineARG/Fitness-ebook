import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/funnel-data";

export function Faq() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-black sm:text-4xl">Preguntas frecuentes</h2>

        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`item-${index}`}
              className="mb-3 rounded-2xl border border-border bg-surface px-4"
            >
              <AccordionTrigger className="text-left text-sm font-bold hover:no-underline sm:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
