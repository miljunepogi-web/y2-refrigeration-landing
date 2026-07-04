import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/CTAButton";
import { pricingPlans } from "@/lib/content";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            badge="Pricing"
            title="Simple 3-Tier Packages That Keep Your Aircon Performing"
            description="The middle plan is highlighted to mirror the approved premium treatment while keeping each package easy to compare for quick booking decisions."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const highlighted = Boolean(plan.badge);
            return (
              <Reveal key={plan.name} delay={index * 0.06}>
                <div
                  className={[
                    "glass-panel relative rounded-[2rem] p-7",
                    highlighted
                      ? "gold-ring bg-[linear-gradient(180deg,rgba(217,164,65,0.12),rgba(255,255,255,0.03))]"
                      : "",
                  ].join(" ")}
                >
                  {plan.badge ? (
                    <Badge className="absolute top-5 right-5 rounded-full border border-primary/20 bg-primary px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#081227]">
                      {plan.badge}
                    </Badge>
                  ) : null}
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    {plan.name}
                  </p>
                  <div className="mt-5 text-5xl font-semibold text-white">{plan.price}</div>
                  <p className="mt-4 min-h-14 text-sm leading-7 text-[#9fb0d1]">{plan.description}</p>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-[#dce8ff]">
                        <div className="flex size-7 items-center justify-center rounded-full bg-secondary/12 text-secondary">
                          <Check className="size-4" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <CTAButton
                    href="#contact"
                    label={highlighted ? "Book Premium Clean" : "Choose This Plan"}
                    variant={highlighted ? "primary" : "secondary"}
                    className="mt-10 w-full justify-center"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
