"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function FloatingContactButtons() {
  return (
    <div className="fixed right-3 bottom-3 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[#081227]/78 p-2 shadow-[0_18px_40px_rgba(3,9,26,0.32)] backdrop-blur-xl sm:right-4 sm:bottom-4 sm:flex-col sm:rounded-[1.4rem] sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
      <Link
        href={siteConfig.messengerUrl}
        target="_blank"
        rel="noreferrer"
        className="flex size-10 items-center justify-center rounded-full border border-secondary/20 bg-secondary text-sm font-semibold text-white shadow-[0_18px_40px_rgba(58,141,255,0.35)] transition-transform duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-auto sm:gap-3 sm:px-5"
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">Messenger</span>
      </Link>
      <Link
        href={siteConfig.phoneHref}
        className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-[#0f2148] text-sm font-semibold text-white shadow-[0_18px_40px_rgba(3,9,26,0.35)] transition-transform duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-auto sm:gap-3 sm:px-5"
      >
        <PhoneCall className="size-5 text-primary" />
        <span className="hidden sm:inline">Call Now</span>
      </Link>
    </div>
  );
}
