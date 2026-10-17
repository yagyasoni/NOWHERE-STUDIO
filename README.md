# Nowhere — creative studio site

A front-end portfolio prototype by **Yagya Soni**: the structure, motion and
art direction of an independent creative-studio website, built from scratch
with a modern React stack. The studio, its people, clients, awards and prices
are invented, every image and video is free stock, and the social links are
labels only, so nothing here points at a real person, place or account.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack)
- **React 19**, **TypeScript**
- **Tailwind CSS v4** for layout utilities, plus a small set of hand-written
  component classes in `src/app/globals.css`
- **GSAP 3** + ScrollTrigger for scroll-driven motion, **Lenis** for smooth scroll
- `next/font` (Geist + IBM Plex Mono), `next/image` for remote images

## What is in it

| Page | Highlights |
| --- | --- |
| `/` | Intro loader with counter and cycling SVG "balloons"; wordmark hero where the letters are windows onto a film and the scroll zooms through them; showreel; sticky travelling "works" label with an editorial 12-column project grid, clip-path reveals, parallax and a pointer-following "explore" pill; a pinned manifesto film that shrinks into a frame on a museum wall; studio info; an interactive playground of chrome shapes that scatter from the cursor; a glitch section whose text scrambles with scroll speed, falls away and writes in a final statement; FAQ accordion; footer with a giant wordmark reveal |
| `/works` | All projects on the editorial grid |
| `/works/[slug]` | Case study: title/number, sticky meta, concept, dense 12-column gallery, credits, and a "next project" block that fills a timeline as you keep scrolling and then opens the next case |
| `/studio` | Hero, services grid, how-we-work, clients, showreel, awards, quote, team |
| `/awards` | Press & awards lists, quote pre-footer |
| `/method` | Three-step method, augmented studio, pre-footer |

The site is fluid: on desktop `1rem = 1vw`, so every size scales with the
viewport exactly like the original. Breakpoints are 992px, 768px and 480px.

## Content and media

- All copy lives in `src/content/site.ts`; projects live in `src/content/works.ts`.
- Images come from [Lorem Picsum](https://picsum.photos) served in grayscale;
  videos are free clips from [Mixkit](https://mixkit.co). Both are mapped in
  `src/content/media.ts`, so swapping imagery is a one-file change.
- The intro loader plays once per browser session (`sessionStorage`).
- The manifesto film's "sound" toggle plays a soundscape generated at runtime
  with the Web Audio API (`src/lib/ambience.ts`): the stock clip is silent and
  no audio file ships with the site.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Project layout

```
src/
  app/            routes (home, works, works/[slug], studio, awards, method, not-found)
  components/     shared UI (nav, loader, footer, FAQ, cards, grid, page hero…)
    home/         the home-page sections
    ui/           button, arrows, autoplay video, parallax wrapper
  content/        copy, projects, media map
  lib/            gsap/lenis setup, loader events, cursor pill, text splitting
```
