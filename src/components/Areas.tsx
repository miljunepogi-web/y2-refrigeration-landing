import Image from "next/image";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { priorityAreas, serviceAreas } from "@/lib/content";

export function Areas() {
  return (
    <section id="areas" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            badge="Service Coverage"
            title="We Serve All of Cavite"
            description="From Bacoor to Alfonso, our team supports homes and businesses across Cavite, with same-day availability in many priority locations."
          />
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area, index) => {
            const featured = priorityAreas.has(area);
            return (
              <Reveal key={area} delay={index * 0.02}>
                <div
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium",
                    featured
                      ? "border-primary/30 bg-primary/10 text-white"
                      : "border-white/10 bg-[#10234d] text-[#dce8ff]",
                  ].join(" ")}
                >
                  <MapPin className={featured ? "size-4 text-primary" : "size-4 text-primary/80"} />
                  {area}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08} className="mt-10">
          <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
              <Image
                src="/assets/images/areas-map.svg"
                alt="Cavite service coverage visual"
                width={1280}
                height={720}
                loading="lazy"
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-4 px-2 pt-6 md:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold text-white">20 municipalities served</p>
                <p className="mt-2 text-sm text-[#9fb0d1]">
                  Designed as a visual proof block to avoid a flat chip-only layout.
                </p>
              </div>
              <div className="glass-panel rounded-[1.3rem] p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-primary">Priority Areas</p>
                <p className="mt-2 text-base text-[#dce8ff]">Bacoor, Imus, Dasmariñas, General Trias, Tagaytay</p>
              </div>
              <div className="glass-panel rounded-[1.3rem] p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-primary">Availability</p>
                <p className="mt-2 text-base text-[#dce8ff]">Same-day booking support in most high-demand locations</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
