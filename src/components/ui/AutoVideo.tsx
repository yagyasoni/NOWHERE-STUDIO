"use client";

import { useEffect, useRef } from "react";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & { src: string };

/**
 * Muted, looping, inline video that only plays while on screen.
 * React does not reliably reflect the `muted` attribute on the server, so it
 * is set imperatively before `play()` to satisfy autoplay policies.
 */
export default function AutoVideo({ src, className = "", ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.loop = true;
    el.playsInline = true;
    const play = () => el.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else el.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      {...rest}
    />
  );
}
