"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { randomGlyph, splitChars } from "@/lib/scramble";
import { home } from "@/content/site";
import { img } from "@/content/media";

/** How many times "we are nowhere" repeats in each scattered block. */
const GLITCH_LINES = 4;

const POSITIONS = [
  "bottom-[23%] right-[29%]",
  "top-[23%] -left-[18%]",
  "top-[40%] left-[23%]",
  "top-[6%] right-0",
  "opacity-0",
  "top-[9%] left-[36%]",
];

/**
 * "we are nowhere" scattered across a sticky screen. The glyphs jitter with
 * scroll speed, then fall away as the section scrolls, revealing the final
 * statement letter by letter. Two small images drift up from the bottom.
 */
export default function Glitch() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const blocks = [...section.querySelectorAll<HTMLElement>("[data-glitch]")];
      const splitBlocks = blocks.map((b) => splitChars(b));
      const all = splitBlocks.flat();
      const finalEl = section.querySelector<HTMLElement>("[data-final]")!;
      const finalChars = splitChars(finalEl);
      finalChars.forEach(({ span }) => (span.style.opacity = "0"));

      // --- velocity-driven scramble -------------------------------------
      let heat = 0;
      let target = 0;
      let frame = 0;
      let raf: number | null = null;
      let running = false;
      const tick = () => {
        if (!running) return;
        frame++;
        heat += (target - heat) * 0.14;
        target *= 0.9;
        if (frame % 8 === 0) {
          if (heat > 0.01) {
            all.forEach(({ span, original }) => {
              span.textContent = Math.random() < heat * 0.6 ? randomGlyph() : original;
            });
          } else {
            all.forEach(({ span, original }) => (span.textContent = original));
          }
        }
        raf = requestAnimationFrame(tick);
      };
      const startLoop = () => {
        if (running) return;
        running = true;
        frame = 0;
        raf = requestAnimationFrame(tick);
      };
      const stopLoop = () => {
        running = false;
        heat = target = 0;
        if (raf) cancelAnimationFrame(raf);
        all.forEach(({ span, original }) => (span.textContent = original));
      };
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: startLoop,
        onEnterBack: startLoop,
        onLeave: stopLoop,
        onLeaveBack: stopLoop,
        onUpdate: (self) => {
          target = Math.min(Math.abs(self.getVelocity()) / 3400, 0.45);
        },
      });

      // --- the fall, and the final line written in as it progresses ------
      const fall = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "center 30%",
          scrub: 2,
          onUpdate: (self) => {
            const L = self.progress * finalChars.length;
            finalChars.forEach(({ span, original }, i) => {
              if (i < L - 4) {
                span.style.opacity = "1";
                span.textContent = original;
              } else if (i < L) {
                span.style.opacity = "1";
                span.textContent = randomGlyph();
              } else {
                span.style.opacity = "0";
                span.textContent = original;
              }
            });
          },
        },
      });
      splitBlocks.forEach((chars, bi) => {
        const at = bi * 0.06;
        chars.forEach(({ span }) => {
          fall.to(
            span,
            {
              y: gsap.utils.random(40, 160),
              x: gsap.utils.random(-10, 10),
              rotation: gsap.utils.random(-20, 20),
              opacity: 0,
              ease: "power2.in",
              duration: gsap.utils.random(0.25, 0.7),
            },
            at + gsap.utils.random(0, 0.6)
          );
        });
      });

      // --- imagery -------------------------------------------------------
      gsap.to("[data-big]", {
        opacity: 0.3,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: section, start: "top top", end: "center center", scrub: 2 },
      });
      gsap.fromTo(
        "[data-par-1]",
        { y: 100 },
        { y: -300, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1.5 } }
      );
      gsap.fromTo(
        "[data-par-2]",
        { y: 100 },
        { y: -800, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 3 } }
      );
      gsap.fromTo(
        "[data-par-1] [data-inner]",
        { yPercent: 0 },
        { yPercent: -8, ease: "none", scrollTrigger: { trigger: section, start: "20% top", end: "bottom top", scrub: 3 } }
      );
      gsap.fromTo(
        "[data-par-2] [data-inner]",
        { yPercent: 0 },
        { yPercent: 10, ease: "none", scrollTrigger: { trigger: section, start: "20% top", end: "bottom top", scrub: 3 } }
      );

      return () => stopLoop();
    },
    { scope: root }
  );

  const line = Array.from({ length: GLITCH_LINES }, (_, i) => (
    <span key={i}>
      {home.glitchLine}
      {i < GLITCH_LINES - 1 && <br />}
    </span>
  ));

  return (
    <section ref={root} className="relative overflow-clip bg-black text-white max-sm:overflow-y-visible">
      <div data-big className="relative w-full opacity-80 max-md:h-screen">
        <Image
          src={img.glitchHero}
          alt="A figure draped in white fabric standing in a field"
          width={1600}
          height={1600}
          sizes="100vw"
          className="h-auto w-full max-md:h-full max-md:object-cover"
        />
      </div>

      <div className="absolute inset-0 flex items-start justify-center">
        <div className="sticky top-0 grid min-h-screen w-screen grid-cols-3 grid-rows-[1fr_1fr]">
          {POSITIONS.map((pos, i) => (
            <div key={i} className={`relative ${pos === "opacity-0" ? "opacity-0" : ""}`}>
              {pos !== "opacity-0" && (
                <div data-glitch className={`absolute text-[1.125rem] font-normal leading-none max-md:text-[0.75rem] ${pos}`}>
                  {line}
                </div>
              )}
            </div>
          ))}
          <div
            data-final
            className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 text-[1.125rem] font-normal leading-none max-sm:top-[45%]"
          >
            {home.glitchFinal.map((l, i) => (
              <span key={i}>
                {l}
                {i < home.glitchFinal.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center gap-[9rem] bg-gradient-to-t from-black to-transparent pt-[10rem] max-sm:flex-col max-sm:items-end max-sm:px-[1.25rem]">
        <div
          data-par-1
          className="relative h-[23.125rem] w-[28.25rem] overflow-hidden max-lg:h-[14rem] max-lg:w-[20rem] max-sm:-mb-[14.4rem] max-sm:h-[8rem] max-sm:w-[12rem] max-sm:self-start"
        >
          <div data-inner className="absolute inset-x-0 top-0 h-[110%]">
            <Image src={img.glitchBox} alt="A bowl of fruit" fill sizes="30vw" className="object-cover" />
          </div>
        </div>
        <div
          data-par-2
          className="relative h-[18.9375rem] w-[13.4375rem] overflow-hidden max-lg:h-[15rem] max-lg:w-[9rem] max-sm:mb-[1.8rem] max-sm:h-[9rem] max-sm:w-[7rem]"
        >
          <div data-inner className="absolute inset-x-0 top-0 h-[110%]">
            <Image src={img.glitchBalloon} alt="A dog wrapped in a blanket" fill sizes="15vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
