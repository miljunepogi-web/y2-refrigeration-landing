import Image from "next/image";
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
            title="Real-World Service Moments, Styled Like a Premium Showcase"
            description="The page uses a strong visual rhythm, so this gallery balances practical proof with polished presentation through large media cards and confident captions."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <article className="glass-panel overflow-hidden rounded-[2rem] p-4">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image
                  src={galleryItems[0].image}
                  alt={galleryItems[0].title}
                  width={1200}
                  height={860}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-2 pt-6 pb-2">
                <h3 className="text-2xl font-semibold text-white">{galleryItems[0].title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9fb0d1]">
                  {galleryItems[0].caption}
                </p>
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
