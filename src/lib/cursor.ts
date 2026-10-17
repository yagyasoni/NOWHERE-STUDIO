import { gsap } from "./gsap";

/**
 * Makes a small pill (`.cursor-pill`) trail the pointer inside `link`,
 * popping in on enter and shrinking away on leave. Returns a cleanup.
 */
export function attachCursorPill(link: HTMLElement, cursor: HTMLElement) {
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3" });
  const move = (e: MouseEvent) => {
    const r = link.getBoundingClientRect();
    xTo(e.clientX - r.left);
    yTo(e.clientY - r.top);
  };
  const enter = (e: MouseEvent) => {
    const r = link.getBoundingClientRect();
    gsap.set(cursor, { x: e.clientX - r.left, y: e.clientY - r.top });
    gsap.to(cursor, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.8)", overwrite: "auto" });
  };
  const leave = () =>
    gsap.to(cursor, { scale: 0, autoAlpha: 0, duration: 0.38, ease: "power3.in", overwrite: "auto" });
  link.addEventListener("mousemove", move);
  link.addEventListener("mouseenter", enter);
  link.addEventListener("mouseleave", leave);
  return () => {
    link.removeEventListener("mousemove", move);
    link.removeEventListener("mouseenter", enter);
    link.removeEventListener("mouseleave", leave);
  };
}
