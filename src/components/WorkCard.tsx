"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, isDesktop } from "@/lib/gsap";
import { attachCursorPill } from "@/lib/cursor";
import { coverUrl, type Work } from "@/content/works";
import { SmallArrow } from "./ui/ArrowIcon";

const CLIPS = ["inset(100% 100% 0% 0%)", "inset(100% 0% 0% 100%)", "inset(100% 0% 0% 0%)"];

type Props = {
  work: Work;
  index: number;
  /** Vertical scrub offset on desktop (px). */
  parallax?: number;
  style?: React.CSSProperties;
  className?: string;
};

export default function WorkCard({ work, index, parallax = 0, style, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = root.current!.querySelector<HTMLElement>("[data-img-w]");
      const img = root.current!.querySelector<HTMLElement>("[data-img]");
      gsap.set(wrap, { clipPath: CLIPS[index % CLIPS.length] });
      gsap.to(wrap, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: root.current, start: "top 88%", toggleActions: "play none none none" },
      });
      if (isDesktop()) {
        if (parallax) {
          gsap.fromTo(
            root.current,
            { y: 0 },
            {
              y: parallax,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
            }
          );
        }
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: -20,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom center", scrub: 3 },
          }
        );
      }
      return attachCursorPill(linkRef.current!, cursorRef.current!);
    },
    { scope: root, dependencies: [index, parallax] }
  );

  return (
    <div ref={root} className={`work_item ${className}`} style={style}>
      <h2 className="label-mono mb-[1rem]">{work.title}</h2>
      <p className="mb-[1.25rem] text-[1.5625rem] font-medium leading-none max-lg:text-[1.25rem]">{work.tagline}</p>
      <Link ref={linkRef} href={`/works/${work.slug}`} className="relative block overflow-hidden rounded-[0.25rem]">
        <div data-img-w className="img-work-w relative w-full overflow-hidden rounded-[0.25rem]">
          <div data-img className="absolute inset-x-0 top-0 h-[125%]">
            <Image
              src={coverUrl(work, 1400, 1000)}
              alt={`${work.title} — ${work.tagline}`}
              fill
              sizes="(min-width: 992px) 60vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>
        <div ref={cursorRef} className="cursor-pill">
          <span>explore</span>
          <SmallArrow />
        </div>
      </Link>
    </div>
  );
}
