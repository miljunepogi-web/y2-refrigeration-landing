import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            badge="Services"
            title="Premium Service Packages Built for Cooling Performance"
            description="From everyday maintenance to urgent repairs, every service is structured to restore comfort, improve airflow, and protect long-term unit performance."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <Card className="glass-panel group h-full rounded-[1.75rem] transition duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:bg-white/[0.075]">
                  <CardContent className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <Icon className="size-6" />
                      </div>
                      {service.badge ? (
                        <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-primary">
                          {service.badge}
                        </Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[#9fb0d1]">{service.description}</p>
                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#dce8ff]">
                      Learn more
                      <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
