"use client";

import { useId } from "react";

/**
 * Shiny "inflatable" objects drawn in SVG with metallic gradients. They stand
 * in for the studio's signature balloon/foil photography without copying it.
 */
type ShapeProps = { className?: string; style?: React.CSSProperties };

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.22" stopColor="#d9d9d9" />
        <stop offset="0.45" stopColor="#4b4b4b" />
        <stop offset="0.6" stopColor="#0c0c0c" />
        <stop offset="0.82" stopColor="#8a8a8a" />
        <stop offset="1" stopColor="#f2f2f2" />
      </linearGradient>
      <radialGradient id={`${id}-ball`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.25" stopColor="#bdbdbd" />
        <stop offset="0.6" stopColor="#2b2b2b" />
        <stop offset="0.85" stopColor="#0a0a0a" />
        <stop offset="1" stopColor="#5c5c5c" />
      </radialGradient>
      <radialGradient id={`${id}-pink`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#fff2f7" />
        <stop offset="0.3" stopColor="#f3b7cf" />
        <stop offset="0.7" stopColor="#8a4e68" />
        <stop offset="1" stopColor="#3a1f2c" />
      </radialGradient>
      <radialGradient id={`${id}-blue`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#f0f6ff" />
        <stop offset="0.3" stopColor="#9ec0ee" />
        <stop offset="0.7" stopColor="#2b4f87" />
        <stop offset="1" stopColor="#0e1c33" />
      </radialGradient>
      <radialGradient id={`${id}-hi`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

export function ChromeStar({ className, style }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <Defs id={id} />
      <g fill={`url(#${id}-chrome)`}>
        <rect x="83" y="6" width="34" height="188" rx="17" />
        <rect x="83" y="6" width="34" height="188" rx="17" transform="rotate(60 100 100)" />
        <rect x="83" y="6" width="34" height="188" rx="17" transform="rotate(120 100 100)" />
      </g>
      <ellipse cx="78" cy="60" rx="18" ry="9" fill={`url(#${id}-hi)`} transform="rotate(-30 78 60)" />
    </svg>
  );
}

export function ChromeHeart({ className, style }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <Defs id={id} />
      <path
        d="M100 182C40 140 8 100 14 62 19 32 46 18 68 24c14 4 25 15 32 28 7-13 18-24 32-28 22-6 49 8 54 38 6 38-26 78-86 120Z"
        fill={`url(#${id}-ball)`}
      />
      <ellipse cx="62" cy="58" rx="20" ry="10" fill={`url(#${id}-hi)`} transform="rotate(-25 62 58)" />
    </svg>
  );
}

export function ChromeBall({ className, style, tone = "ball" }: ShapeProps & { tone?: "ball" | "pink" | "blue" }) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <Defs id={id} />
      <circle cx="100" cy="100" r="88" fill={`url(#${id}-${tone})`} />
      <ellipse cx="70" cy="62" rx="26" ry="14" fill={`url(#${id}-hi)`} transform="rotate(-30 70 62)" />
    </svg>
  );
}

export function ChromeRing({ className, style }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <Defs id={id} />
      <circle cx="100" cy="100" r="66" fill="none" stroke={`url(#${id}-pink)`} strokeWidth="44" />
      <ellipse cx="62" cy="52" rx="20" ry="9" fill={`url(#${id}-hi)`} transform="rotate(-35 62 52)" />
    </svg>
  );
}

export function ChromeCandy({ className, style }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <Defs id={id} />
      <path d="M8 70 L46 92 L8 130 L30 100Z" fill={`url(#${id}-chrome)`} />
      <path d="M192 70 L154 92 L192 130 L170 100Z" fill={`url(#${id}-chrome)`} />
      <ellipse cx="100" cy="100" rx="60" ry="42" fill={`url(#${id}-chrome)`} />
      <ellipse cx="78" cy="80" rx="22" ry="9" fill={`url(#${id}-hi)`} transform="rotate(-15 78 80)" />
    </svg>
  );
}

export function ChromeCube({ className, style }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <Defs id={id} />
      <path d="M100 20 L176 60 L100 100 L24 60Z" fill="#e9eef7" />
      <path d="M24 60 L100 100 L100 184 L24 144Z" fill={`url(#${id}-blue)`} />
      <path d="M176 60 L100 100 L100 184 L176 144Z" fill="#17304f" />
      <ellipse cx="86" cy="54" rx="24" ry="8" fill={`url(#${id}-hi)`} transform="rotate(-20 86 54)" />
    </svg>
  );
}

export function ChromeSmiley({ className, style }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <Defs id={id} />
      <circle cx="100" cy="100" r="88" fill={`url(#${id}-chrome)`} />
      <circle cx="72" cy="82" r="9" fill="#0a0a0a" />
      <circle cx="128" cy="82" r="9" fill="#0a0a0a" />
      <path d="M62 118c12 22 64 22 76 0" stroke="#0a0a0a" strokeWidth="9" strokeLinecap="round" fill="none" />
      <ellipse cx="70" cy="56" rx="24" ry="11" fill={`url(#${id}-hi)`} transform="rotate(-30 70 56)" />
    </svg>
  );
}

export const loaderShapes = [
  ChromeHeart,
  ChromeStar,
  ChromeSmiley,
  ChromeCandy,
  ChromeBall,
  ChromeRing,
  ChromeCube,
];
