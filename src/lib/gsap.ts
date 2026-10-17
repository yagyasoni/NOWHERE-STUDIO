import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
}

export { gsap, ScrollTrigger, Flip, useGSAP };

export const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 992px)").matches;

export const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
