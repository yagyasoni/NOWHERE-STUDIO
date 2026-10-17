"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis-store";
import {
  LOADER_REVEAL_START,
  LOADER_REVEALED,
  loaderPlayed,
  loaderState,
  markLoaderPlayed,
} from "@/lib/loader-events";
import { loaderShapes } from "./ChromeShapes";

/** How long the shapes cycle before the loader lifts. */
const LOADER_MS = 3200;
const MIN_STEP = 100;
const MAX_STEP = 500;

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const nRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const loader = root.current;
      if (!loader) return;

      const emitReveal = () => {
        loaderState.done = true;
        window.dispatchEvent(new CustomEvent(LOADER_REVEAL_START));
        gsap.delayedCall(2, () => window.dispatchEvent(new CustomEvent(LOADER_REVEALED)));
      };

      if (loaderPlayed()) {
        gsap.set(loader, { display: "none" });
        requestAnimationFrame(emitReveal);
        return;
      }

      markLoaderPlayed();
      lenisStore.stop();
      window.scrollTo(0, 0);
      gsap.set(loader, { display: "block" });

      const n = nRef.current!;
      const mark = markRef.current!;
      const wrap = wrapRef.current!;
      const counter = counterRef.current!;
      const imgs = [...wrap.querySelectorAll<HTMLElement>(".loader-img")];
      let idx = 0;
      let timer: ReturnType<typeof setTimeout> | null = null;
      let counterTween: gsap.core.Tween | null = null;

      const stepFor = (elapsed: number) => {
        const p = Math.min(elapsed / LOADER_MS, 1);
        return MIN_STEP + (MAX_STEP - MIN_STEP) * (1 - Math.sin(p * Math.PI));
      };

      const finish = () => {
        gsap.to(imgs[idx], { scale: 0, duration: 0.6, ease: "power4.inOut", delay: 0.5 });
        gsap.to(wrap, {
          width: "1rem",
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.6,
          onComplete: collapse,
        });
      };

      const collapse = () => {
        gsap.to(counter, { autoAlpha: 0, duration: 0.5, ease: "power4.inOut" });
        gsap.to(n, { yPercent: 100, duration: 1, ease: "power4.inOut" });
        gsap.to(mark, { scale: 0, duration: 1, ease: "power4.inOut" });
        emitReveal();
        gsap.to(loader, {
          height: 0,
          duration: 1.8,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(loader, { display: "none" });
            lenisStore.start();
          },
        });
      };

      const cycle = (start: number) => {
        const elapsed = performance.now() - start;
        if (elapsed >= LOADER_MS) {
          finish();
          return;
        }
        timer = setTimeout(() => {
          const cur = imgs[idx];
          gsap.killTweensOf(cur);
          gsap.set(cur, { clearProps: "all" });
          gsap.set(cur, { opacity: 0 });
          idx = (idx + 1) % imgs.length;
          const next = imgs[idx];
          gsap.killTweensOf(next);
          gsap.fromTo(
            next,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(1.2)" }
          );
          cycle(start);
        }, stepFor(elapsed));
      };

      const startCounter = () => {
        const obj = { val: 100 };
        counter.textContent = "100";
        counterTween = gsap.to(obj, {
          val: 0,
          duration: LOADER_MS / 750,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = Math.round(obj.val).toString().padStart(3, "0");
          },
          onComplete: () => {
            counter.textContent = "000";
          },
        });
      };

      const startShapes = () => {
        imgs.forEach((el) => gsap.set(el, { opacity: 0 }));
        const first = imgs[0];
        const w = window.matchMedia("(max-width: 991px)").matches ? "10rem" : "20rem";
        gsap.fromTo(wrap, { width: "1rem" }, { width: w, duration: 1.2, ease: "power4.inOut" });
        gsap.set(first, { opacity: 1, scale: 0 });
        gsap.to(first, {
          scale: 1,
          rotate: 15,
          duration: 0.8,
          ease: "back.out(0.9)",
          delay: 0.5,
          onComplete: () => {
            startCounter();
            cycle(performance.now());
          },
        });
      };

      gsap.set(counter, { autoAlpha: 1 });
      counter.textContent = "100";
      gsap.set(n, { yPercent: 100, opacity: 0 });
      gsap.set(mark, { scale: 0, transformOrigin: "center center" });
      gsap.to(n, { yPercent: 0, opacity: 1, duration: 1, ease: "power4.inOut", onComplete: startShapes });
      gsap.to(mark, { scale: 1, duration: 1, ease: "power4.inOut" });

      return () => {
        if (timer) clearTimeout(timer);
        counterTween?.kill();
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="loader fixed inset-0 z-[1001] hidden bg-black" aria-hidden>
      <div className="flex h-full w-full flex-col items-center justify-between p-[1.875rem] text-[1rem] font-bold uppercase leading-none tracking-[0.05em] text-white">
        <div className="opacity-0">.</div>
        <div className="flex h-[7.6rem] items-start justify-center">
          <div className="flex overflow-hidden">
            <span ref={nRef} className="block text-[6.25rem] leading-[0.8] opacity-0 max-lg:text-[3rem]">
              N
            </span>
          </div>
          <div
            ref={wrapRef}
            className="pointer-events-none relative -mt-[25%] flex h-[20rem] w-[1rem] items-center justify-center max-lg:h-[10rem]"
          >
            {loaderShapes.map((Shape, i) => (
              <div
                key={i}
                className="loader-img absolute h-[20rem] w-[20rem] opacity-0 max-lg:h-[10rem] max-lg:w-[10rem]"
                style={{ transform: i === 0 ? "scale(0)" : undefined }}
              >
                <Shape className="h-full w-full" />
              </div>
            ))}
          </div>
          <span ref={markRef} className="block text-[6.25rem] leading-[0.8] max-lg:text-[3rem]">
            .
          </span>
        </div>
        <div ref={counterRef} className="relative z-[99] tabular-nums">
          000
        </div>
      </div>
    </div>
  );
}
