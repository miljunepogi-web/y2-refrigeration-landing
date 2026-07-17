import Link from "next/link";
import { Camera, Mail, MessageCircleMore, PhoneCall } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 md:py-12">
      <div className="section-shell grid gap-10 md:grid-cols-3">
        <div>
          <BrandMark className="items-center gap-4" imageClassName="h-11 md:h-12 xl:h-12" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#9fb0d1]">
            Premium aircon cleaning, repairs, installation, and preventive maintenance across Cavite.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Quick Links</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#dce8ff]">
            <Link href="#services">Services</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#areas">Areas We Serve</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-[#dce8ff]">
            <Link href={siteConfig.phoneHref} className="flex items-center gap-3 transition hover:text-white">
              <PhoneCall className="size-4 text-primary" />
              {siteConfig.phoneDisplay}
            </Link>
            <Link href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition hover:text-white">
              <Mail className="size-4 text-primary" />
              {siteConfig.email}
            </Link>
            <Link
              href={siteConfig.messengerUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <MessageCircleMore className="size-4 text-primary" />
              Chat on Messenger
            </Link>
            <Link
              href={siteConfig.facebookPageUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <Camera className="size-4 text-primary" />
              Facebook Page Updates
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
