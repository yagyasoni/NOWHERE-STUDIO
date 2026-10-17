"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import type { Work } from "@/content/works";

/**
 * The "next project" block at the bottom of a case study. Keep scrolling at
 * the end of the page and the timeline fills up; once full, the next case
 * study opens by itself.
 */
export default function NextProject({ next }: { next: Work }) {
  const router = useRouter();
  const fillRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const navigated = useRef(false);

  useEffect(() => {
    const fill = fillRef.current!;
    gsap.set(fill, { width: "0%" });
    let decay: ReturnType<typeof setTimeout> | null = null;
    const href = `/works/${next.slug}`;
    router.prefetch(href);

    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    const onWheel = (e: WheelEvent) => {
      if (navigated.current || e.deltaY <= 0 || !atBottom()) return;
      progress.current = Math.min(1, progress.current + e.deltaY / 1200);
      gsap.to(fill, { width: `${progress.current * 100}%`, duration: 0.3, ease: "power2.out", overwrite: true });
      if (decay) clearTimeout(decay);
      if (progress.current >= 1) {
        navigated.current = true;
        router.push(href);
        return;
      }
      decay = setTimeout(() => {
        progress.current = 0;
        gsap.to(fill, { width: "0%", duration: 0.8, ease: "power4.out", overwrite: true });
      }, 700);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (decay) clearTimeout(decay);
    };
  }, [next.slug, router]);

  return (
    <div className="relative mb-[2.25rem] flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-[2rem]">
      <Link href={`/works/${next.slug}`} className="absolute inset-0 z-[1]" aria-label={`Next project: ${next.title}`} />
      <h2 className="h1-case max-sm:text-[3.25rem]">{next.title}</h2>
      <h2 className="h1-case max-md:hidden">{next.number}</h2>
      <div className="hidden text-[0.875rem] max-md:block">Next project</div>
      <div className="absolute inset-x-0 bottom-0 h-[0.5rem] w-full">
        <div ref={fillRef} className="h-full bg-black" />
      </div>
    </div>
  );
}
