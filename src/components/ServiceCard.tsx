"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { attachCursorPill } from "@/lib/cursor";
import { pic } from "@/content/media";
import { SmallArrow } from "./ui/ArrowIcon";

type Props = { n: string; title: string; text: string; picId: number };

export default function ServiceCard({ n, title, text, picId }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  useGSAP(() => attachCursorPill(linkRef.current!, cursorRef.current!), { scope: linkRef });

  return (
    <div>
      <div className="label-mono mb-[1rem]">
        {n} {title}
      </div>
      <Link ref={linkRef} href="/works" className="relative block max-h-[22rem] w-full overflow-hidden rounded-[0.25rem]">
        <div className="relative aspect-[4/3] w-full">
          <Image src={pic(picId, 900, 680)} alt={title} fill sizes="(min-width: 992px) 33vw, 100vw" className="object-cover" />
        </div>
        <div ref={cursorRef} className="cursor-pill">
          <span>explore</span>
          <SmallArrow />
        </div>
      </Link>
      <h3 className="mt-[1rem] max-w-[18.25rem] text-[1.125rem] font-medium leading-none">{text}</h3>
    </div>
  );
}
