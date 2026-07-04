import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  badge: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Badge className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary">
        {badge}
      </Badge>
      <h2 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[#9fb0d1] md:text-lg">{description}</p>
    </div>
  );
}
