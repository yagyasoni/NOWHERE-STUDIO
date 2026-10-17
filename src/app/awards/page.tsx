import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GridStudio from "@/components/GridStudio";
import Prefooter from "@/components/Prefooter";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { awards, faqSets, studio } from "@/content/site";
import { img } from "@/content/media";

export const metadata: Metadata = { title: "Press & awards" };

export default function AwardsPage() {
  return (
    <>
      <PageHero
        stacked
        title={awards.title}
        subtitle={awards.subtitle}
        left={<p className="text-[0.875rem] font-medium leading-[1.2]">{awards.label}</p>}
        description={awards.intro}
        image={img.awardsHero}
        imageAlt="A ring of light in the dark"
      />
      <section className="bg-white text-black">
        <div className="container-x pb-[5.3125rem]">
          <div className="space-65" />
          {awards.groups.map((group, gi) => (
            <div key={group.label}>
              {gi > 0 && <div className="space-100" />}
              <GridStudio label={group.label}>
                <ul className="list-none p-0">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <div className="flex w-full items-center justify-between max-sm:items-start">
                        <p className="text-[1.875rem] font-medium leading-[1.2] max-sm:text-[1.5rem]">
                          {item.href ? (
                            <a href={item.href} className="transition-opacity hover:opacity-50">
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </p>
                        {"count" in item && item.count && <div className="p-m">{item.count}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </GridStudio>
            </div>
          ))}
        </div>
      </section>
      <Prefooter label={studio.quoteLabel} quote={studio.quote} by={studio.quoteBy} />
      <Faq items={faqSets.awards} />
      <Footer />
    </>
  );
}
