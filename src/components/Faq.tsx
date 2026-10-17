"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { FaqItem } from "@/content/site";

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section className="bg-black text-white">
      <div className="container-x">
        <div className="grid-12 items-center gap-[1rem] text-[1.25rem] font-bold max-sm:flex max-sm:justify-between">
          <div>F</div>
          <div className="col-start-5">A</div>
          <div className="col-start-9">Q</div>
          <div className="col-start-12 justify-self-end">S</div>
        </div>
        <div className="grid-12 mt-[5rem] items-start max-lg:flex max-lg:flex-col max-lg:gap-[2rem]">
          <div className="col-span-3">
            <div className="p-m">( Questions we are asked )</div>
          </div>
          <div className="col-start-5 col-end-13 w-full">
            {items.map((item) => (
              <FaqRow key={item.q} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = el.querySelector<HTMLElement>("[data-q]")!;
      const sepW = el.querySelector<HTMLElement>("[data-sep-w]");
      const sep = el.querySelector<HTMLElement>("[data-sep]");
      const answer = el.querySelector<HTMLElement>("[data-answer]");
      const inner = el.querySelector<HTMLElement>("[data-answer-inner]");
      const bar = el.querySelector<HTMLElement>("[data-cross-v]");
      let open = false;
      let tl: gsap.core.Timeline | null = null;

      gsap.set(answer, { height: 0 });
      gsap.set(sep, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(sepW, { opacity: 0 });
      gsap.set(inner, { yPercent: 30, opacity: 0 });

      const hoverIn = () => !open && gsap.to(q, { opacity: 0.5, duration: 0.6, ease: "power4.inOut", overwrite: true });
      const hoverOut = () => gsap.to(q, { opacity: 1, duration: 0.6, ease: "power4.inOut", overwrite: true });
      const toggle = () => {
        tl?.kill();
        open = !open;
        q.setAttribute("aria-expanded", String(open));
        if (open) {
          hoverOut();
          tl = gsap
            .timeline({ defaults: { ease: "power4.inOut" } })
            .to(sepW, { opacity: 1, duration: 0.6 }, 0)
            .to(sep, { scaleX: 1, duration: 1.4 }, 0)
            .to(answer, { height: "auto", duration: 1.2 }, 0)
            .to(bar, { scaleY: 0, duration: 1.2 }, 0)
            .to(inner, { yPercent: 0, opacity: 1, duration: 1.4 }, 0.1);
        } else {
          tl = gsap
            .timeline({ defaults: { ease: "power4.inOut" } })
            .to(inner, { yPercent: 30, opacity: 0, duration: 0.8 }, 0)
            .to(answer, { height: 0, duration: 1 }, 0)
            .to(bar, { scaleY: 1, duration: 1 }, 0)
            .to(sep, { scaleX: 0, duration: 1 }, 0)
            .to(sepW, { opacity: 0, duration: 0.6 }, 0.4);
        }
      };
      q.addEventListener("click", toggle);
      q.addEventListener("mouseenter", hoverIn);
      q.addEventListener("mouseleave", hoverOut);
      return () => {
        q.removeEventListener("click", toggle);
        q.removeEventListener("mouseenter", hoverIn);
        q.removeEventListener("mouseleave", hoverOut);
        tl?.kill();
      };
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <button
        type="button"
        data-q
        aria-expanded={false}
        className="flex w-full cursor-pointer items-center justify-between gap-[1.5rem] text-left max-md:py-[1rem]"
      >
        <div className="p-xl max-sm:text-balance">{item.q}</div>
        <div className="flex w-[0.75rem] flex-none">
          <svg viewBox="0 0 12 12" fill="none" className="w-[1rem]" aria-hidden>
            <rect y="5" width="12" height="2" fill="currentColor" />
            <rect data-cross-v x="5" width="2" height="12" fill="currentColor" style={{ transformOrigin: "center" }} />
          </svg>
        </div>
      </button>
      <div data-sep-w className="flex h-[2.1875rem] w-full items-center max-lg:h-[1rem]">
        <div data-sep className="h-[1px] w-full bg-white/50" />
      </div>
      <div data-answer className="overflow-hidden">
        <div
          data-answer-inner
          className="ml-auto flex max-w-[31.5rem] flex-col gap-[1rem] pr-[3rem] text-[0.875rem] max-lg:max-w-[25rem] max-lg:pr-0 max-sm:max-w-none"
        >
          <p className="font-normal leading-[1.4]">{item.a}</p>
          <a href={item.href} className="link-underline self-end text-[1rem] font-medium">
            Read more
          </a>
        </div>
      </div>
      <div className="h-[4.375rem]" />
    </div>
  );
}
