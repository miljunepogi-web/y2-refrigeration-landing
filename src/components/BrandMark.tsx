import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandMark({
  href = "#",
  className,
  imageClassName,
  priority = false,
}: BrandMarkProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-3", className)}>
      <Image
        src="/assets/images/logo.jpg"
        alt={siteConfig.shortName}
        width={244}
        height={68}
        priority={priority}
        className={cn("h-10 w-auto rounded-sm md:h-11 xl:h-12", imageClassName)}
      />
      <div>
        <p className="text-sm font-semibold text-white md:text-base">{siteConfig.shortName}</p>
        <p className="text-[11px] text-[#9fb0d1] md:text-xs">Airconditioning Services</p>
      </div>
    </Link>
  );
}
