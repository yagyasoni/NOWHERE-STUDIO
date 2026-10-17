"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis-store";
import { brand, contactUrl, emailUrl, nav, socials } from "@/content/site";
import Button from "./ui/Button";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const links = el.querySelectorAll("[data-mob-link]");
    if (open) {
      lenisStore.stop();
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power4.out" });
      gsap.fromTo(
        links,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.6, ease: "power4.out", stagger: 0.08, delay: 0.1 }
      );
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(el, { display: "none" });
          lenisStore.start();
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[90] hidden h-[100svh] w-full flex-col items-center justify-between bg-white p-[1rem] text-black opacity-0 lg:!hidden"
    >
      <div className="h-0" />
      <div className="flex flex-col gap-[8.125rem]">
        <div className="flex flex-col text-center">
          {nav
            .filter((n) => !n.external)
            .map((item) => (
              <div key={item.label} className="overflow-hidden">
                <Link
                  data-mob-link
                  href={item.href}
                  onClick={onClose}
                  className="block text-[1.875rem] font-bold uppercase tracking-[0.03em]"
                >
                  {item.label}
                </Link>
              </div>
            ))}
        </div>
        <div className="flex flex-col items-center gap-[1rem]">
          <Button href={contactUrl}>Let’s chat</Button>
          <Button href={emailUrl} variant="white" icon="email">
            drop us an email
          </Button>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="link-sm">{brand.tagline}</div>
        <div className="flex items-center gap-[1.375rem]">
          <div className="flex items-center gap-[0.875rem]">
            <span className="link-sm">{socials[0].short}</span>
            <span className="link-sm">/</span>
            <span className="link-sm">{socials[1].short}</span>
          </div>
          <span className="link-sm rounded-[4px] bg-black px-[0.25rem] py-[0.25rem] text-white">EN</span>
        </div>
      </div>
    </div>
  );
}
