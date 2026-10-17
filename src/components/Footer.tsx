"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { randomGlyph, splitChars } from "@/lib/scramble";
import { brand, contactUrl, emailUrl, home, siteCredit, socials } from "@/content/site";
import Button from "./ui/Button";
import Wordmark from "./Wordmark";

/** "( built from nowhere by Yagya Soni )" */
const creditText = `( ${siteCredit.siteByPrefix} ${siteCredit.siteBy.map((c) => c.name).join(" & ")} )`;

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const creditRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const wrap = markRef.current!;
      const letters = wrap.querySelectorAll<HTMLElement>("[data-letter]");
      const dot = wrap.querySelector<HTMLElement>("[data-mark]");
      gsap.set(letters, { y: 0, yPercent: 120 });
      gsap.set(dot, { scale: 0, transformOrigin: "center center" });

      gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 95%", once: true },
      })
        .to(letters, { yPercent: 0, duration: 1.2, ease: "power4.inOut", stagger: 0.03, delay: 0.2 })
        .to(dot, { scale: 1, duration: 0.6, ease: "back.out(0.9)" }, "-=0.4");

      // Playful squash on hover, like a balloon being poked.
      letters.forEach((l) => {
        l.addEventListener("mouseenter", () => {
          gsap
            .timeline({ overwrite: "auto" })
            .to(l, { scaleY: 0.05, transformOrigin: "bottom", duration: 0.6, ease: "power2.inOut" })
            .to(l, { scaleY: 1, duration: 1.8, ease: "elastic.out(1, 0.8)" });
        });
      });

      // The credit in the corner writes itself in from noise, glyph by glyph,
      // the same way the glitch section resolves its last line. Hovering it
      // scrambles and resolves it again.
      const credit = creditRef.current!;
      const chars = splitChars(credit);
      const progress = { p: 0 };
      const decode = () => {
        gsap.killTweensOf(progress);
        gsap.fromTo(progress, { p: 0 }, {
          p: 1,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            const L = progress.p * chars.length;
            chars.forEach(({ span, original }, i) => {
              span.textContent = i < L - 3 ? original : randomGlyph();
            });
          },
          onComplete: () => chars.forEach(({ span, original }) => (span.textContent = original)),
        });
      };
      gsap.set(credit, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: credit,
        start: "top 100%",
        once: true,
        onEnter: () => {
          gsap.to(credit, { autoAlpha: 1, duration: 0.4 });
          decode();
        },
      });
      credit.addEventListener("mouseenter", decode);
      return () => credit.removeEventListener("mouseenter", decode);
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="relative flex min-h-screen items-end bg-black text-white">
      <div className="container-x pb-[2.25rem] max-sm:pb-[2.75rem]">
        <div>
          <h2 className="h1-home">
            {home.footerTitle[0]}
            <br />
            {home.footerTitle[1]}
          </h2>
          <div className="space-24" />
          <div className="grid-12 items-start gap-[1rem] max-lg:flex max-lg:justify-between max-sm:grid max-sm:grid-cols-1 max-sm:gap-[3.75rem]">
            <div className="col-span-6 flex items-center gap-[0.75rem] max-sm:flex-col max-sm:items-start">
              <Button href={contactUrl}>book a call</Button>
              <Button href={emailUrl} icon="email">
                drop us an email
              </Button>
            </div>
            <div className="col-start-10 col-end-13 flex flex-col items-start max-sm:col-auto">
              {socials.map((s) => (
                <span key={s.label} className="mb-[6px] text-[1.5625rem] font-medium leading-none">
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-150 mob-100" />
        <div className="w-full" ref={markRef}>
          <Wordmark hidden />
        </div>
        <div className="space-12" />
        <div className="flex items-center justify-between gap-[2rem] max-lg:justify-center max-md:flex-col max-md:gap-0 max-sm:gap-[0.5rem] max-sm:text-center">
          <div className="flex gap-[1rem] text-[0.875rem] font-normal leading-[1.2] max-sm:flex-col max-sm:gap-[0.25rem]">
            <p className="max-sm:text-balance">
              {brand.year} — {brand.footerLine}
            </p>
            <p className="max-lg:hidden">
              Visuals by{" "}
              {siteCredit.visualsBy.map((c) => (
                <a key={c.name} href={c.href} className="link-underline" target="_blank" rel="noreferrer">
                  {c.name}
                </a>
              ))}
            </p>
          </div>
          <div className="flex items-center gap-[1rem] font-mono text-[0.875rem] font-medium">
            <Link href="/studio">STUDIO</Link>
            <Link href="/awards">AWARDS</Link>
            <Link href="/method">METHOD</Link>
          </div>
        </div>
      </div>
      <p
        ref={creditRef}
        aria-label={creditText}
        className="absolute bottom-[0.75rem] right-[1.25rem] m-0 cursor-default select-none whitespace-nowrap font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/45 transition-colors duration-300 hover:text-white max-lg:right-[1rem] max-lg:text-[0.625rem]"
      >
        {creditText}
      </p>
    </footer>
  );
}
