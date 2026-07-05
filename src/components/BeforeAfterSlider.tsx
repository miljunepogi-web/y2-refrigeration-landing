"use client";

import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useId, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  beforeHint: string;
  afterHint: string;
  alt: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  beforeHint,
  afterHint,
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

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <div className="absolute top-5 right-5 rounded-full bg-[#18c67f] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(10,16,30,0.25)]">
            {afterLabel}
          </div>
          <p className="absolute right-5 bottom-4 max-w-[38%] text-right text-xs text-white/90 sm:text-sm">
            {afterHint}
          </p>
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
              <div className="absolute top-5 left-5 rounded-full bg-[#d91018] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(10,16,30,0.25)]">
                {beforeLabel}
              </div>
              <p className="absolute bottom-4 left-5 max-w-[38%] text-xs text-white/90 sm:text-sm">
                {beforeHint}
              </p>
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

        <div className="pointer-events-none absolute right-5 bottom-4 left-5 z-10 flex items-end justify-center">
          <p className="text-xs text-white/75 sm:text-sm">drag to compare</p>
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
