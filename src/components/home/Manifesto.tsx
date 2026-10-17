"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger, isDesktop } from "@/lib/gsap";
import { createAmbience, type Ambience } from "@/lib/ambience";
import { img, video } from "@/content/media";

/** Master level of the soundscape when the toggle is on. */
const SOUND_LEVEL = 0.8;

/**
 * The manifesto film hangs on a museum wall. On desktop the section pins while
 * the film shrinks from filling the screen into its frame and the wall settles.
 *
 * The stock clip is silent, so the "sound" toggle drives a generated ambient
 * soundscape (see lib/ambience.ts) rather than the video's own track. It
 * fades in while the film is on screen and out as it leaves.
 */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoWRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const reflectRef = useRef<HTMLVideoElement>(null);
  const soundRef = useRef<HTMLButtonElement>(null);
  const tickRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current!;
      const main = mainRef.current!;
      const reflect = reflectRef.current!;
      const sound = soundRef.current!;
      const videos = [main, reflect];
      let on = false;
      let started = false;
      let ambience: Ambience | null = null;

      videos.forEach((v) => {
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = "auto";
      });
      gsap.set(sound, { opacity: 0, pointerEvents: "none" });

      const start = () => {
        if (started) return;
        started = true;
        videos.forEach((v) => v.play().catch(() => {}));
        gsap.to(sound, { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" });
      };
      const setVolume = (up: boolean, delay = 0, dur = 1.6) => {
        ambience?.fadeTo(up ? SOUND_LEVEL : 0, dur, delay);
      };
      const tickTravel = () => {
        const t = toggleRef.current!.getBoundingClientRect();
        const k = tickRef.current!.getBoundingClientRect();
        return Math.max(0, t.right - k.right - (k.left - t.left));
      };
      const onToggle = () => {
        on = !on;
        sound.classList.toggle("is-on", on);
        sound.setAttribute("aria-pressed", String(on));
        gsap.to(tickRef.current, { x: on ? tickTravel() : 0, duration: 0.3, ease: "power2.out" });
        if (on) {
          // Built inside the click so the browser lets it play.
          ambience ??= createAmbience();
          ambience?.resume().catch(() => {});
        }
        setVolume(on, 0, on ? 1.2 : 0.5);
      };
      sound.addEventListener("click", onToggle);
      const onEnter = () => {
        start();
        if (on) setVolume(true);
      };
      const onLeave = () => on && setVolume(false, 1.4);
      // Silence the drone when the tab is hidden; bring it back when it returns.
      const onVisibility = () => {
        if (!ambience) return;
        if (document.hidden) ambience.suspend().catch(() => {});
        else if (on) ambience.resume().catch(() => {});
      };
      document.addEventListener("visibilitychange", onVisibility);

      ScrollTrigger.create({ trigger: wrap, start: "top 85%", onEnter, onEnterBack: onEnter });

      if (isDesktop()) {
        gsap.fromTo(
          videoWRef.current,
          { scale: 1.4 },
          {
            scale: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: "bottom top",
              pin: wrap,
              pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onEnter,
              onEnterBack: onEnter,
              onLeave,
              onLeaveBack: onLeave,
            },
          }
        );
        gsap.fromTo(
          bgRef.current,
          { scale: 1.8 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top top", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
          }
        );
      } else {
        ScrollTrigger.create({ trigger: wrap, start: "top top", end: "bottom top", onEnter, onEnterBack: onEnter, onLeave, onLeaveBack: onLeave });
      }

      return () => {
        sound.removeEventListener("click", onToggle);
        document.removeEventListener("visibilitychange", onVisibility);
        ambience?.dispose();
        videos.forEach((v) => {
          v.pause();
          v.muted = true;
        });
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-black text-white">
      <div
        ref={wrapRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden max-lg:h-[80vh] max-md:h-[60vh] max-sm:h-[50vh]"
      >
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image src={img.museumWall} alt="" fill sizes="100vw" className="object-cover opacity-90" aria-hidden />
        </div>
        <div ref={videoWRef} className="relative z-[1] w-full origin-center scale-[0.6] will-change-transform max-sm:scale-[0.7]">
          <div className="relative mx-auto w-full">
            <video
              ref={reflectRef}
              src={video.manifesto}
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full opacity-65 blur-[80px] max-md:mt-[2rem] max-md:blur-[20px] max-sm:mt-[1rem] max-sm:blur-[10px]"
              aria-hidden
            />
            <video ref={mainRef} src={video.manifesto} muted loop playsInline className="relative z-[1] block w-full" />
            <div
              className="pointer-events-none absolute inset-0 z-[2] scale-[1.01] rounded-[2px] border border-white/25 shadow-[inset_0_0_0_6px_rgba(0,0,0,0.9),0_40px_120px_rgba(0,0,0,0.7)]"
              aria-hidden
            />
          </div>
        </div>
        <button
          ref={soundRef}
          type="button"
          className="absolute top-0 z-10 mt-[1rem] flex cursor-pointer items-center justify-between gap-[0.625rem] rounded-full bg-black py-[0.25rem] pl-[0.875rem] pr-[0.5rem] text-[0.75rem] uppercase"
          aria-label="Toggle sound"
          aria-pressed="false"
        >
          <span>Sound</span>
          <span ref={toggleRef} className="relative flex h-[0.5rem] w-[1.25rem] items-center rounded-full bg-white p-[1px]">
            <span ref={tickRef} className="h-[0.375rem] w-[0.375rem] rounded-full bg-black" />
          </span>
        </button>
      </div>
    </section>
  );
}
