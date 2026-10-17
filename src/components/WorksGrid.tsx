import type { Work } from "@/content/works";
import WorkCard from "./WorkCard";

/** Desktop placement pattern on a 12-column grid, 4 rows per cycle of six. */
const DESKTOP = [
  { col: "1 / 7", row: 0, align: "start", h: "43.125rem" },
  { col: "9 / 13", row: 0, align: "end", h: "26.875rem" },
  { col: "3 / 11", row: 1, align: "start", h: "42.25rem" },
  { col: "1 / 5", row: 2, align: "end", h: "26.875rem" },
  { col: "7 / 13", row: 2, align: "start", h: "43.125rem" },
  { col: "3 / 11", row: 3, align: "start", h: "42.25rem" },
];
const ROWS_PER_CYCLE = 4;
const PARALLAX = [80, -150, -100, -160, 100, -90];

/** Mobile placement on a 6-column grid. */
const MOBILE = [
  { col: "1 / 7", ratio: "1 / 1", small: false },
  { col: "", ratio: "253 / 241", small: true },
  { col: "1 / 7", ratio: "343 / 550", small: false },
];

export default function WorksGrid({ items }: { items: Work[] }) {
  return (
    <div className="work-grid">
      {items.map((work, i) => {
        const d = DESKTOP[i % DESKTOP.length];
        const m = MOBILE[i % MOBILE.length];
        const mobileCol = m.small ? (Math.floor(i / MOBILE.length) % 2 === 0 ? "3 / 7" : "1 / 5") : m.col;
        const style = {
          "--d-col": d.col,
          "--d-row": String(Math.floor(i / DESKTOP.length) * ROWS_PER_CYCLE + d.row + 1),
          "--d-align": d.align,
          "--d-h": d.h,
          "--m-col": mobileCol,
          "--m-ratio": m.ratio,
        } as React.CSSProperties;
        return <WorkCard key={work.slug} work={work} index={i} parallax={PARALLAX[i % PARALLAX.length]} style={style} />;
      })}
    </div>
  );
}
