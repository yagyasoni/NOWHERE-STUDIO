"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  title: string;
  subtitle: string;
  /** Title and subtitle stacked (studio pages) or on one line (project pages). */
  stacked?: boolean;
  left: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  hideSubtitleOnMobile?: boolean;
};

export default function PageHero({
  title,
  subtitle,
  stacked = false,
  left,
  description,
  image,
  imageAlt,
  hideSubtitleOnMobile = false,
}: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heads = root.current!.querySelectorAll("[data-flip]");
      gsap.fromTo(
        heads,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.4, ease: "power4.inOut", stagger: 0.12, delay: 0.1 }
      );
      gsap.fromTo(
        "[data-desc]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.6 }
      );
      gsap.fromTo(
        "[data-hero-img]",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut", delay: 0.5 }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-white text-black">
      <div className="container-x pb-[2.25rem]">
        <div className="flex h-[50vh] items-center justify-between max-lg:h-[25vh]">
          <div
            className={`flex w-full ${
              stacked ? "flex-col items-start" : "items-center justify-between max-sm:flex-col max-sm:items-start"
            }`}
          >
            <div className="overflow-hidden">
              <h1 data-flip className="h1-case">
                {title}
              </h1>
            </div>
            <div className={`overflow-hidden ${hideSubtitleOnMobile ? "max-md:hidden" : ""}`}>
              <h2 data-flip className="h1-case">
                {subtitle}
              </h2>
            </div>
          </div>
        </div>
        <div className="grid min-h-[50vh] grid-cols-2 items-end max-lg:grid-cols-1">
          <div className="sticky bottom-0 flex items-center gap-[9rem] self-end pb-[1rem] max-lg:static max-lg:mb-[1.5rem] max-lg:justify-between max-lg:pb-0 max-sm:hidden">
            {left}
          </div>
          <div className="flex flex-col gap-[2.5rem]">
            <h2 data-desc className="max-w-[35.75rem] text-[1.5625rem] font-medium leading-[1.2] max-lg:text-[1.25rem]">
              {description}
            </h2>
            <div data-hero-img className="relative min-h-[500px] w-full overflow-hidden rounded-[0.25rem]" style={{ aspectRatio: "14 / 9" }}>
              <Image src={image} alt={imageAlt} fill sizes="(min-width: 992px) 50vw, 100vw" className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
