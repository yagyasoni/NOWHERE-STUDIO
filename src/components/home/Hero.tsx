"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LOADER_REVEAL_START, LOADER_REVEALED, loaderState } from "@/lib/loader-events";
import { brand, contactUrl, home } from "@/content/site";
import { video } from "@/content/media";
import Wordmark from "../Wordmark";
import Button from "../ui/Button";
import Socials from "../Socials";
import AutoVideo from "../ui/AutoVideo";

/**
 * Hero: a 300vh scroll stage. The wordmark is black type on a white sheet
 * blended with `screen`, so the letters become windows onto the film behind.
 * Scrolling zooms through the letters until only the film remains; the next
 * section then slides up over it.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const letters = [...markRef.current!.querySelectorAll<HTMLElement>("[data-letter]")];
      const dot = markRef.current!.querySelector<HTMLElement>("[data-mark]");
      const fades = overlayRef.current!.querySelectorAll<HTMLElement>("[data-fade]");
      gsap.set(fades, { autoAlpha: 0, y: 20 });
      // Replace the CSS hidden state with GSAP-owned transforms so the
      // percentage reveal is not fighting a parsed pixel offset.
      gsap.set(letters, { y: 0, yPercent: 120 });
      gsap.set(dot, { scale: 0, transformOrigin: "center center" });

      const reveal = () => {
        gsap.fromTo(
          gsap.utils.shuffle([...letters]),
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.8,
            ease: "power4.inOut",
            stagger: 0.07,
            delay: 0.2,
            onComplete: () => window.dispatchEvent(new CustomEvent(LOADER_REVEALED)),
          }
        );
        gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(0.9)", delay: 1.5 });
        gsap.to(fades, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out", stagger: 0.1, delay: 1.1 });
      };

      if (loaderState.done) reveal();
      else window.addEventListener(LOADER_REVEAL_START, reveal, { once: true });

      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 },
        })
        .to(markRef.current, { scale: 16, ease: "power2.in", transformOrigin: "50% 60%", duration: 0.5 }, 0)
        .to(sheetRef.current, { opacity: 0, duration: 0.18, ease: "none" }, 0.32)
        .to(overlayRef.current, { opacity: 0, duration: 0.15 }, 0.3)
        .to({}, { duration: 0.5 });

      return () => window.removeEventListener(LOADER_REVEAL_START, reveal);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AutoVideo src={video.hero} className="absolute inset-0 h-full w-full object-cover" />

        <div
          ref={sheetRef}
          className="absolute inset-0 flex items-center justify-center bg-white"
          style={{ mixBlendMode: "screen" }}
        >
          <div ref={markRef} className="w-full px-[1.25rem] text-black">
            <Wordmark hidden />
          </div>
        </div>

        <div
          ref={overlayRef}
          className="blend-diff absolute inset-0 z-[2] flex flex-col justify-between px-[1.25rem] pb-[1rem] pt-[5.25rem] text-white max-lg:px-[1rem]"
        >
          <div data-fade className="w-full">
            <div className="p-l">
              {home.heroLead[0]}
              <br />
              {home.heroLead[1]}
            </div>
            <div className="space-24" />
            <Button href={contactUrl} variant="blend">
              {home.heroCta}
            </Button>
          </div>
          <div data-fade className="flex w-full items-center justify-between">
            <h1 className="text-[0.875rem] font-medium">{brand.tagline}</h1>
            <Socials />
          </div>
        </div>
      </div>
    </section>
  );
}
