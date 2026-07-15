"use client";

import Image from "next/image";
import { Gauge, MoveHorizontal, Sparkles, Wind, Zap } from "lucide-react";
import { useId, useState } from "react";

const sliderFeatureIcons = {
  gauge: Gauge,
  sparkles: Sparkles,
  wind: Wind,
  zap: Zap,
} as const;

type SliderFeature = {
  label: string;
  icon: keyof typeof sliderFeatureIcons;
};

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  beforeFeatures: SliderFeature[];
  afterFeatures: SliderFeature[];
  alt: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  beforeFeatures,
  afterFeatures,
  alt,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);
  const sliderId = useId();

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#060f22]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={afterSrc}
          alt={alt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-[#040a17]/88 via-[#040a17]/38 to-transparent" />

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <div className="absolute top-5 right-5 rounded-full bg-[#18c67f] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(10,16,30,0.25)]">
            {afterLabel}
          </div>
          <div className="absolute right-5 bottom-3 flex max-w-[34%] flex-col gap-2 text-right">
            {afterFeatures.map((feature) => {
              const Icon = sliderFeatureIcons[feature.icon];
              return (
                <div key={feature.label} className="flex items-center justify-end gap-2 text-sm text-white">
                  <Icon className="size-4 shrink-0 text-white" />
                  <span className="leading-5">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="relative h-full w-full">
            <Image
              src={beforeSrc}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 z-10">
              <div className="absolute top-5 left-5 rounded-full bg-[#d91018] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(10,16,30,0.25)]">
                {beforeLabel}
              </div>
              <div className="absolute bottom-3 left-5 flex max-w-[34%] flex-col gap-2">
                {beforeFeatures.map((feature) => {
                  const Icon = sliderFeatureIcons[feature.icon];
                  return (
                    <div key={feature.label} className="flex items-center gap-2 text-sm text-white">
                      <Icon className="size-4 shrink-0 text-white" />
                      <span className="leading-5">{feature.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{ left: `calc(${position}% - 1px)` }}
        >
          <div className="relative h-full w-[2px] bg-white/95 shadow-[0_0_0_1px_rgba(217,164,65,0.4)]">
            <div className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/85 bg-white text-[#081227] shadow-[0_14px_40px_rgba(5,11,24,0.4)]">
              <MoveHorizontal className="size-5" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center">
          <p className="rounded-full bg-black/20 px-3 py-1 text-xs text-white/80 backdrop-blur-sm sm:text-sm">
            drag to compare
          </p>
        </div>

        <label htmlFor={sliderId} className="sr-only">
          Compare before and after aircon cleaning images
        </label>
        <input
          id={sliderId}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Before and after comparison slider"
        />
      </div>
    </div>
  );
}
