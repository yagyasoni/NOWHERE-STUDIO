"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { pic } from "@/content/media";
import type { GalleryItem } from "@/content/works";

const CLIPS = ["inset(100% 0% 0% 0%)", "inset(100% 100% 0% 0%)", "inset(100% 0% 0% 100%)"];
const RATIO: Record<number, string> = { 12: "16 / 10", 8: "4 / 3", 6: "1 / 1", 4: "3 / 4" };
const SPAN: Record<number, string> = {
  12: "lg:col-span-12",
  8: "lg:col-span-8",
  6: "lg:col-span-6",
  4: "lg:col-span-4",
};

export default function Gallery({ items, title }: { items: GalleryItem[]; title: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      root.current!.querySelectorAll<HTMLElement>("[data-g]").forEach((el, i) => {
        gsap.set(el, { clipPath: CLIPS[i % CLIPS.length] });
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="grid grid-cols-1 gap-[1.25rem] lg:grid-cols-12 lg:[grid-auto-flow:row_dense]">
      {items.map((item, i) => {
        const span = item.span ?? 12;
        const w = span >= 8 ? 1800 : 1000;
        const [a, b] = RATIO[span].split(" / ").map(Number);
        return (
          <div
            key={`${item.id}-${i}`}
            data-g
            className={`relative w-full overflow-hidden rounded-[0.25rem] ${SPAN[span]}`}
            style={{ aspectRatio: RATIO[span] }}
          >
            <Image
              src={pic(item.id, w, Math.round((w * b) / a))}
              alt={`${title} — image ${i + 1}`}
              fill
              sizes={span === 12 ? "100vw" : "(min-width: 992px) 50vw, 100vw"}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
