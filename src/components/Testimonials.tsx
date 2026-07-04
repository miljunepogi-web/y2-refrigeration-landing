import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { testimonialItems } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            badge="Testimonials"
            title="Trusted by Cavite Customers Who Value Clean, Reliable Service"
            description="Social proof matters on service businesses, so this section keeps the tone personal, local, and credibility-focused without feeling generic."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonialItems.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.05}>
              <article className="glass-panel h-full rounded-[1.75rem] p-7">
                <Quote className="size-8 text-primary" />
                <p className="mt-5 text-lg leading-8 text-[#e9f1ff]">{item.quote}</p>
                <div className="mt-8">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-[#9fb0d1]">{item.location}, Cavite</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
