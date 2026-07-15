import Image from "next/image";
import { CheckCircle2, Shield, Snowflake, Timer } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { stats, trustBadges } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative pt-8 pb-18 md:pt-12 md:pb-24 xl:pt-18 xl:pb-30">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 xl:gap-16">
        <div className="relative z-10">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-[0.72rem] sm:tracking-[0.22em]">
            <Snowflake className="size-3.5" />
            Premium Aircon Services in Cavite
          </div>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.85rem,8vw,5.65rem)] font-semibold leading-[0.97] text-white">
            Fast, Reliable Aircon Care for Homes, Offices, and Rentals.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#b2c3e4] md:max-w-xl md:text-lg xl:text-[1.18rem]">
            Installation, cleaning, repair, and preventive maintenance designed
            for strong cooling, cleaner airflow, and service you can trust.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={siteConfig.bookingUrl} label="Book Cleaning Now" />
            <CTAButton href={siteConfig.quoteUrl} label="Get Free Quote" variant="secondary" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustBadges.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#d8e5ff]"
              >
                <CheckCircle2 className="size-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel blue-glow relative overflow-hidden rounded-[2rem] p-4 md:p-5 xl:p-6">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-secondary/14 to-transparent" />
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
            <Image
              src="/assets/images/hero-tech.png"
              alt="YSquared Services premium hero illustration"
              width={860}
              height={940}
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute top-4 right-4 rounded-2xl border border-white/10 bg-[#081227]/88 p-3 backdrop-blur-xl sm:top-8 sm:right-8 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <Timer className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-[#9fb0d1] sm:text-sm">Response time</p>
                <p className="text-sm font-semibold text-white sm:text-base">Same-day in most areas</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-[#081227]/88 p-3 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/15">
                <Shield className="size-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-[#9fb0d1] sm:text-sm">Trusted workmanship</p>
                <p className="text-sm font-semibold text-white sm:text-base">Diagnostic-first service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell mt-8 grid gap-4 sm:grid-cols-2 xl:mt-10 xl:grid-cols-4">
        {stats.map((stat) => (
          <AnimatedCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
