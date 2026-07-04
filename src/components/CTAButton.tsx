"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CTAButton({
  href,
  label,
  variant = "primary",
  className,
}: CTAButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5",
        isPrimary
          ? "gold-gradient text-[#081227] shadow-[0_0_0_1px_rgba(255,230,178,0.18),0_18px_48px_rgba(217,164,65,0.28)] hover:brightness-105"
          : "border border-white/14 bg-white/5 text-white hover:bg-white/8 hover:text-white",
        className,
      )}
    >
      {isPrimary ? <Sparkles className="size-4" /> : null}
      {label}
      <ArrowRight className="size-4 opacity-80" />
    </Link>
  );
}
