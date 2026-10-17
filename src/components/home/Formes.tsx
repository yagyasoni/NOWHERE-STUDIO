"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChromeBall, ChromeCandy, ChromeCube, ChromeHeart, ChromeStar } from "../ChromeShapes";

/**
 * A playground of shiny objects and stray letters that scatter away from the
 * pointer and spring back, like balloons nudged in a room.
 *
 * Touch screens have no hover, so two things stand in for it: the finger
 * nudges the objects as it scrolls past (touchmove keeps reporting the finger
 * while the page scrolls, which pointer events stop doing), and the objects
 * drift gently on their own so the room never looks still.
 */
export default function Formes() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const items = [...el.querySelectorAll<HTMLElement>("[data-forme]")];
      const baseRot = new Map(items.map((i) => [i, parseFloat(i.dataset.rot ?? "0")]));
      items.forEach((i) => gsap.set(i, { rotation: baseRot.get(i) }));

      const params = () =>
        window.matchMedia("(max-width: 767px)").matches
          ? { radius: 260, maxDist: 110, rotForce: 12, scaleForce: 0.1 }
          : { radius: 460, maxDist: 380, rotForce: 30, scaleForce: 0.2 };

      const displaced = (i: HTMLElement) => gsap.getProperty(i, "x") !== 0 || gsap.getProperty(i, "y") !== 0;
      const reset = (i: HTMLElement) =>
        gsap.to(i, { x: 0, y: 0, rotation: baseRot.get(i), scale: 1, duration: 1.2, ease: "elastic.out(1, 0.35)", overwrite: "auto" });
      const resetAll = () => items.forEach((i) => displaced(i) && reset(i));

      const nudge = (px: number, py: number) => {
        const { radius, maxDist, rotForce, scaleForce } = params();
        items.forEach((i) => {
          const r = i.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.hypot(dx, dy);
          if (dist > radius) {
            if (displaced(i)) reset(i);
            return;
          }
          const L = 1 - dist / radius;
          const push = L * maxDist;
          const angle = Math.atan2(dy, dx);
          gsap.to(i, {
            x: -Math.cos(angle) * push,
            y: -Math.sin(angle) * push,
            rotation: baseRot.get(i)! + L * rotForce * (dx > 0 ? -1 : 1),
            scale: 1 + L * scaleForce,
            duration: 0.45,
            ease: "power4.out",
            overwrite: "auto",
          });
        });
      };

      // Mouse and pen keep the original hover behaviour. Touch is handled
      // below: a touch pointer goes quiet the moment the page starts to scroll.
      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== "touch") nudge(e.clientX, e.clientY);
      };
      const onPointerLeave = (e: PointerEvent) => {
        if (e.pointerType !== "touch") resetAll();
      };
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerleave", onPointerLeave);

      // Listen on the window so a scroll that starts outside the playground
      // still nudges the objects as the finger passes them.
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        nudge(t.clientX, t.clientY);
      };
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", resetAll, { passive: true });
      window.addEventListener("touchcancel", resetAll, { passive: true });

      // Idle drift where there is no hover to invite play.
      const floats: gsap.core.Tween[] = [];
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
        el.querySelectorAll<HTMLElement>("[data-float]").forEach((inner, k) => {
          floats.push(
            gsap.to(inner, {
              y: gsap.utils.random(8, 18) * (k % 2 ? -1 : 1),
              x: gsap.utils.random(-8, 8),
              rotation: gsap.utils.random(-4, 4),
              duration: gsap.utils.random(2.2, 3.8),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: gsap.utils.random(0, 1.5),
            })
          );
        });
      }

      return () => {
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", resetAll);
        window.removeEventListener("touchcancel", resetAll);
        floats.forEach((t) => t.kill());
      };
    },
    { scope: root }
  );

  const letter = "absolute select-none font-bold leading-none";

  return (
    <div ref={root} className="relative min-h-[55rem] max-lg:min-h-[40rem]">
      <Forme className="absolute left-[30%] top-[10%] z-[5] h-[28.3125rem] w-[28.3125rem] max-lg:left-[19%] max-lg:top-[17%] max-lg:h-[16rem] max-lg:w-[20rem] max-sm:left-[12%]">
        <ChromeCube className="h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
      </Forme>
      <Forme className="absolute right-[35%] top-[20%] w-[8.875rem] max-sm:right-[65%] max-sm:top-[29%]">
        <ChromeBall tone="pink" className="h-auto w-full" />
      </Forme>
      <Forme rot={112} className="absolute bottom-[48%] right-[34%] w-[8.875rem] max-lg:w-[5rem] max-sm:bottom-[45%] max-sm:right-[17%]">
        <ChromeCandy className="h-auto w-full" />
      </Forme>
      <Forme className="absolute -top-[3%] left-[34%] z-[4] w-[30rem] max-lg:left-[28%] max-lg:w-[18rem] max-sm:left-[1%]">
        <ChromeStar className="h-auto w-full" />
      </Forme>
      <Forme rot={-18} className="absolute -top-[3%] right-[28%] w-[15rem] max-lg:right-[13%] max-sm:-right-[6%] max-sm:-top-[6%]">
        <ChromeHeart className="h-auto w-full" />
      </Forme>
      {/* stray letters of the wordmark */}
      <Forme className={`${letter} left-[24%] top-[19%] text-[3rem] max-lg:left-[18%] max-sm:-left-[1%] max-sm:top-[14%]`}>N</Forme>
      <Forme rot={34} className={`${letter} bottom-[52%] right-[25%] text-[1rem] max-lg:bottom-[63%] max-lg:right-[18%]`}>O</Forme>
      <Forme rot={-20} className={`${letter} left-[30%] top-[6%] text-[1.6rem] max-sm:left-[11%] max-sm:-top-[4%]`}>W</Forme>
      <Forme className={`${letter} bottom-[50%] left-[30%] text-[1rem] max-sm:bottom-[45%] max-sm:left-[12%]`}>H</Forme>
      <Forme className={`${letter} right-[31%] top-[20%] text-[1.25rem] max-sm:right-[21%] max-sm:top-[11%]`}>.</Forme>
      <Forme className={`${letter} left-[48%] top-[64%] text-[0.8rem] max-lg:top-[55%] max-sm:top-[60%]`}>E</Forme>
    </div>
  );
}

/**
 * One object: the outer box is what the pointer scatters, the inner box is
 * what drifts on its own, so the two motions never fight over a transform.
 */
function Forme({ rot = 0, className, children }: { rot?: number; className: string; children: React.ReactNode }) {
  return (
    <div data-forme data-rot={rot} className={className}>
      <div data-float className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
