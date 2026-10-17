"use client";

import { useRef } from "react";
import { gsap, useGSAP, isDesktop } from "@/lib/gsap";

/** Wraps children in a scroll-scrubbed vertical drift (desktop only). */
export default function Parallax({
  children,
  y = -60,
  scrub = 1.5,
  className = "",
}: {
  children: React.ReactNode;
  y?: number;
  scrub?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!isDesktop()) return;
      gsap.fromTo(
        ref.current,
        { y: 0 },
        { y, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub } }
      );
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
