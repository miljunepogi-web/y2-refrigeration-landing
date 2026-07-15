import Image from "next/image";
import { Gauge, ShieldCheck, Zap } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { galleryItems } from "@/lib/content";

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            badge="Gallery"
            title="See the Difference Between Dirty and Properly Serviced Units"
            description="Restore cooling efficiency and extend your air conditioner's lifespan with professional outdoor unit cleaning."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <article className="glass-panel overflow-hidden rounded-[2rem] p-4">
              <BeforeAfterSlider
                beforeSrc="/assets/images/dirty.png"
                afterSrc="/assets/images/clean.png"
                beforeLabel="Before Cleaning"
                afterLabel="After Cleaning"
                beforeFeatures={[
                  { label: "Dirt buildup", icon: "gauge" },
                  { label: "Restricted airflow", icon: "wind" },
                  { label: "Higher power consumption", icon: "zap" },
                ]}
                afterFeatures={[
                  { label: "Clean condenser", icon: "sparkles" },
                  { label: "Better heat dissipation", icon: "wind" },
                  { label: "Improved efficiency", icon: "gauge" },
                ]}
                alt={galleryItems[0].title}
              />
              <div className="px-3 pt-6 pb-2 sm:px-4">
                <h3 className="text-[2rem] font-semibold leading-[1.05] text-white sm:text-[2.15rem]">
                  Outdoor Unit Cleaning
                </h3>
                <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[#c2d1eb] sm:text-[1.05rem] sm:leading-8">
                  Restore cooling efficiency and extend your air conditioner&apos;s lifespan with professional outdoor unit cleaning.
                </p>
                <div className="mt-7 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-0">
                  {[
                    {
                      label: "Improved Cooling Performance",
                      icon: ShieldCheck,
                    },
                    {
                      label: "Lower Energy Consumption",
                      icon: Zap,
                    },
                    {
                      label: "Longer Unit Lifespan",
                      icon: Gauge,
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={[
                          "flex items-center gap-3 text-sm text-[#dce8ff]",
                          index > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : "sm:pr-6",
                        ].join(" ")}
                      >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                          <Icon className="size-[18px] text-[#dce8ff]" />
                        </div>
                        <span className="max-w-[10rem] text-[0.98rem] leading-6 sm:max-w-[9rem]">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-6">
            {galleryItems.slice(1).map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="glass-panel overflow-hidden rounded-[2rem] p-4">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={920}
                      height={620}
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-2 pt-6 pb-2">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#9fb0d1]">{item.caption}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
