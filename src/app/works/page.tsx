import type { Metadata } from "next";
import WorksGrid from "@/components/WorksGrid";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { works } from "@/content/works";
import { faqSets, home } from "@/content/site";

export const metadata: Metadata = { title: "Works" };

export default function WorksPage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="container-x">
          <div className="space-150" />
          <div className="flex items-center justify-between max-lg:mb-[2.5rem]">
            <h1 className="h1-case">Works</h1>
            <h2 className="h1-case max-sm:hidden">{home.worksYears.replace(/\s/g, "")}</h2>
          </div>
          <div className="space-150 mob-50" />
          <WorksGrid items={works} />
          <div className="space-150 mob-100" />
        </div>
      </section>
      <Faq items={faqSets.works} />
      <Footer />
    </>
  );
}
