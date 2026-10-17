import Image from "next/image";
import GridStudio from "./GridStudio";
import { img } from "@/content/media";

/** Black pre-footer band with a faint texture, used on the Awards and Method pages. */
export default function Prefooter({
  label,
  quote,
  by,
  children,
}: {
  label: string;
  quote: string;
  by?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-black text-white max-md:min-h-[38vh]">
      <Image
        src={img.prefooter}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        aria-hidden
      />
      <div className="container-x relative">
        <div className="space-170 max-md:hidden" />
        <div className="space-65" />
        <div className="space-170 max-md:hidden" />
        <GridStudio label={label}>
          <h2 className="h2-style balance">{quote}</h2>
          <div className="space-24" />
          {by && <div className="p-s">{by}</div>}
          {children}
        </GridStudio>
        <div className="space-24" />
        <div className="space-150 mob-50" />
      </div>
    </section>
  );
}
