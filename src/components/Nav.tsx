"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { brand, nav } from "@/content/site";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const menu = menuRef.current!;
      const links = [...linksRef.current!.querySelectorAll<HTMLElement>("[data-menu-link]")];
      const rects = [...dotsRef.current!.querySelectorAll("rect")];
      const spread = rects.map((r) => {
        const x = parseFloat(r.getAttribute("x") || "0");
        const y = parseFloat(r.getAttribute("y") || "0");
        return { x: x + 1 < 3 ? -0.3 : 0.3, y: y + 1 < 3 ? -0.3 : 0.3 };
      });
      gsap.set(links, { yPercent: 100, opacity: 0 });

      const enter = () => {
        if (window.matchMedia("(max-width: 991px)").matches) return;
        gsap.to(links, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.08, overwrite: "auto" });
        gsap.to(dotsRef.current, { rotateZ: 45, duration: 0.5, ease: "power4.out" });
        rects.forEach((r, i) => gsap.to(r, { x: spread[i].x, y: spread[i].y, duration: 0.5, ease: "power4.out" }));
      };
      const leave = () => {
        gsap.to(links, { yPercent: 100, opacity: 0, duration: 0.4, ease: "power4.out", stagger: { each: 0.04, from: "end" }, overwrite: "auto" });
        gsap.to(dotsRef.current, { rotateZ: 0, duration: 0.5, ease: "power4.out" });
        rects.forEach((r) => gsap.to(r, { x: 0, y: 0, duration: 0.5, ease: "power4.out" }));
      };
      menu.addEventListener("mouseenter", enter);
      menu.addEventListener("mouseleave", leave);
      return () => {
        menu.removeEventListener("mouseenter", enter);
        menu.removeEventListener("mouseleave", leave);
      };
    },
    { scope: menuRef }
  );

  return (
    <>
      <nav className="blend-diff pointer-events-none fixed inset-x-0 top-0 z-[1001] flex h-[4rem] items-start justify-between px-[1.25rem] pt-[1.28rem] text-white max-lg:h-auto max-lg:pt-[1rem]">
        <Link
          href="/"
          className="pointer-events-auto block min-w-[6.2rem] text-[1.45rem] font-bold uppercase leading-[0.8] tracking-[-0.04em] max-lg:text-[1.3rem]"
          aria-label={`${brand.name} home`}
          onClick={() => setOpen(false)}
        >
          {brand.name}
          {brand.mark}
        </Link>

        <div ref={menuRef} className="link-sm pointer-events-auto relative max-lg:flex max-lg:w-auto">
          <button
            type="button"
            className="relative mb-[0.1rem] flex cursor-default items-center justify-end gap-[0.375rem] max-lg:cursor-pointer"
            onClick={() => {
              if (window.matchMedia("(max-width: 991px)").matches) setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="link-sm">{open ? "close" : "menu"}</span>
            <svg
              ref={dotsRef}
              viewBox="0 0 6 6"
              fill="none"
              className="absolute -right-[0.75rem] h-[0.375rem] w-[0.375rem] max-lg:relative max-lg:right-auto max-lg:h-[0.7rem] max-lg:w-[0.75rem]"
              aria-hidden
            >
              <rect y="4" width="2" height="2" fill="currentColor" />
              <rect x="4" y="4" width="2" height="2" fill="currentColor" />
              <rect width="2" height="2" fill="currentColor" />
              <rect x="4" width="2" height="2" fill="currentColor" />
            </svg>
          </button>

          <div
            ref={linksRef}
            className="absolute right-0 top-full -ml-[1.4rem] flex flex-col gap-[0.1rem] pt-[0.3rem] text-right max-lg:hidden"
          >
            {nav.map((item) => (
              <div key={item.label} className="overflow-hidden">
                {item.external ? (
                  <a data-menu-link className="link-sm block" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <Link
                    data-menu-link
                    className={`link-sm block ${pathname === item.href ? "underline underline-offset-4" : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
