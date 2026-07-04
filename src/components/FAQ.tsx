import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell grid gap-10 xl:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <SectionTitle
            badge="FAQ"
            align="left"
            title="Questions We Usually Answer Before a Booking"
            description="A smooth accordion helps visitors move from uncertainty to action, especially when they are comparing service providers and response time."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass-panel rounded-[2rem] p-4 md:p-6">
            <Accordion defaultValue={["item-0"]} className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="rounded-[1.35rem] border border-white/8 px-5 data-[state=open]:bg-white/[0.03]"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-7 text-[#9fb0d1]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
