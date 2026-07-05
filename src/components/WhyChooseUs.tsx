import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { whyChooseUs } from "@/lib/content";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:gap-10">
        <Reveal>
          <SectionTitle
            badge="Why Choose Us"
            align="left"
            title="Built Around Trust, Fast Service, and Clear Workmanship"
            description="The approved layout leans premium, so this section reinforces that with proof-driven cards, tidy presentation, and a visible checklist clients can trust."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-panel rounded-[1.5rem] p-5">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary/12 text-secondary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#9fb0d1]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image
                  src="/assets/images/why-strip.png"
                  alt="YSquared Services service proof collage"
                  width={960}
                  height={760}
                  loading="lazy"
                  sizes="(max-width: 1280px) 100vw, 52vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-[1.5rem] border border-primary/14 bg-primary/8 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Certification Checklist
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Cooling output checked before turnover",
                    "Drainage and leak points inspected",
                    "Indoor and outdoor cleanliness verified",
                    "Client walk-through after service",
                  ].map((check) => (
                    <li key={check} className="flex items-start gap-3 text-sm leading-7 text-[#dbe8ff]">
                      <CheckCheck className="mt-1 size-4 shrink-0 text-primary" />
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
