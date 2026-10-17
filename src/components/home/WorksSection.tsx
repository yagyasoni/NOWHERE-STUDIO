"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger, isDesktop } from "@/lib/gsap";
import { home } from "@/content/site";
import { featuredWorks } from "@/content/works";
import WorksGrid from "../WorksGrid";
import ArrowIcon from "../ui/ArrowIcon";

export default function WorksSection() {
  const root = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isDesktop()) return;
      const letters = [...groupRef.current!.querySelectorAll<HTMLElement>("[data-w-letter]")];
      const n = letters.length;
      const dx = () => barRef.current!.clientWidth - groupRef.current!.offsetWidth;

      // "works" travels from the left edge to the right edge and back while the
      // section scrolls, each letter leaving last-first and shrinking as it goes.
      const tl = gsap.timeline({ paused: true, repeat: 1, yoyo: true });
      letters.forEach((l, s) => {
        const o = (n - 1 - s) * 0.2;
        tl.to(l, { x: dx, duration: 1.4, ease: "power4.inOut" }, o);
        tl.to(l, { scale: 0.2, duration: 0.8, ease: "power4.inOut" }, (n - 1 - s) * 0.1);
        tl.to(l, { scale: 1, duration: 0.8, ease: "power4.inOut" }, (n - 1 - s) * 0.1 + 0.8);
      });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 3,
        animation: tl,
        invalidateOnRefresh: true,
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-black text-white">
      <div className="container-x">
        <div
          ref={barRef}
          className="blend-diff sticky top-[3rem] z-10 flex h-[3rem] items-center justify-between max-lg:h-auto"
        >
          <div ref={groupRef} className="flex items-center max-lg:w-full max-lg:justify-between">
            {"works".split("").map((ch, i) => (
              <span
                key={i}
                data-w-letter
                className="inline-block text-[1.875rem] font-bold uppercase leading-none tracking-[-0.03em] max-lg:text-[0.625rem]"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className="space-87" />
        <div className="flex items-center justify-end pr-[3.125rem] max-lg:mb-[5rem] max-lg:justify-start max-lg:pr-0">
          <h2 className="h3-style">
            {home.worksTitle[0]}
            <br />
            {home.worksTitle[1]}
          </h2>
        </div>

        <WorksGrid items={featuredWorks} />

        <div className="space-150 max-lg:hidden" />
        <div className="space-150 mob-100" />
        <div className="flex items-end justify-between">
          <Link href="/works" className="view-all">
            <span>View all</span>
            <ArrowIcon />
          </Link>
          <div className="flex items-center gap-[0.1rem] text-[1.125rem] leading-none">
            <span>(</span>
            <span>{home.worksCount}</span>
            <span>)</span>
          </div>
          <div className="min-w-[9.375rem] text-right text-[1.125rem] max-lg:hidden">{home.worksYears}</div>
        </div>
        <div className="space-150 mob-100" />
      </div>
    </section>
  );
}
