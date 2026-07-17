"use client";

import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { CTAButton } from "@/components/CTAButton";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#pricing", label: "Pricing" },
  { href: "#areas", label: "Areas" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081227]/78 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <BrandMark priority />

        <nav className="hidden items-center gap-8 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#a7b9dd] transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <Link
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-sm text-[#a7b9dd] transition hover:text-white"
          >
            <PhoneCall className="size-4 text-primary" />
            {siteConfig.phoneDisplay}
          </Link>
          <CTAButton href={siteConfig.bookingUrl} label="Book Cleaning Now" />
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white xl:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/8 transition-[max-height,opacity] duration-300 xl:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="section-shell flex flex-col gap-4 py-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("text-base text-[#d2def8]", "transition hover:text-white")}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-base text-[#d2def8] transition hover:text-white"
          >
            <PhoneCall className="size-4 text-primary" />
            {siteConfig.phoneDisplay}
          </Link>
          <CTAButton href={siteConfig.bookingUrl} label="Book Cleaning Now" className="w-full" />
          <CTAButton href={siteConfig.quoteUrl} label="Get Free Quote" variant="secondary" className="w-full" />
        </div>
      </div>
    </header>
  );
}
