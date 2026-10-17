import Link from "next/link";
import Formes from "@/components/home/Formes";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-black text-white">
      <div className="pointer-events-auto absolute inset-x-0 top-[10vh]">
        <Formes />
      </div>
      <div className="relative z-10 mb-[2rem] flex flex-col items-center gap-[1.5rem]">
        <div className="h1-home text-center">Nowhere to be found.</div>
        <Link href="/" className="btn is-white">
          <span>back home</span>
          <span className="arrow-w">
            <span className="line-arrow" />
            <span className="shape-arrow" />
          </span>
        </Link>
      </div>
    </section>
  );
}
