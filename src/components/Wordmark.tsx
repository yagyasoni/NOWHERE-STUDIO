import { brand } from "@/content/site";

type Props = {
  className?: string;
  /** Start with letters pushed down and the mark scaled to zero (for reveals). */
  hidden?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

/**
 * The studio wordmark, one span per letter so GSAP can stagger them.
 * `[data-letter]` targets the letters, `[data-mark]` the trailing dot.
 */
export default function Wordmark({ className = "", hidden = false, ref }: Props) {
  return (
    <div ref={ref} className={`wordmark ${className}`} aria-label={brand.name} role="img">
      {brand.letters.map((l, i) => (
        <span key={i} className="letter-clip">
          <span
            className="letter"
            data-letter
            style={hidden ? { transform: "translateY(120%)" } : undefined}
          >
            {l}
          </span>
        </span>
      ))}
      <span className="letter-clip">
        <span
          className="mark"
          data-mark
          style={hidden ? { transform: "scale(0)" } : undefined}
        >
          {brand.mark}
        </span>
      </span>
    </div>
  );
}
