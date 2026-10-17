"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis-store";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
    lenisStore.set(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisStore.set(null);
    };
  }, []);

  useEffect(() => {
    // New route: start at the top and let ScrollTrigger re-measure after paint.
    lenisStore.get()?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh())
    );
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
