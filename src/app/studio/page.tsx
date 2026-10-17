import type { Metadata } from "next";
import Image from "next/image";
import GridStudio from "@/components/GridStudio";
import ServiceCard from "@/components/ServiceCard";
import Socials from "@/components/Socials";
import Button from "@/components/ui/Button";
import AutoVideo from "@/components/ui/AutoVideo";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { contactUrl, faqSets, studio } from "@/content/site";
import { img, video } from "@/content/media";

export const metadata: Metadata = { title: "Studio" };

export default function StudioPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-screen w-full flex-col items-center justify-between bg-white text-white">
        <Image src={img.studioHero} alt="Looking up between skyscrapers" fill sizes="100vw" priority className="absolute inset-0 z-0 h-screen w-full object-cover" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent from-40% to-black" />
        <div className="container-x relative z-[2] flex h-full flex-col items-start justify-start pl-[15.625rem] pt-[6.25rem] max-lg:pl-[1.25rem]">
          <div>
            <h1 className="text-[5rem] font-medium leading-none tracking-[-0.01em] max-lg:text-[3.25rem]">
              {studio.heroTitle[0]}
              <br />
              {studio.heroTitle[1]}
            </h1>
            <div className="space-24" />
            <Button href={contactUrl}>{studio.heroCta}</Button>
          </div>
        </div>
        <div className="relative z-[2] flex w-full items-center justify-end px-[1.25rem] pb-[2.125rem]">
          <Socials />
        </div>
      </section>

      {/* Who / what / how */}
      <section className="bg-black text-white">
        <div className="container-x pb-[5.3125rem]">
          <div className="space-150 mob-50" />
          <GridStudio label={studio.whoLabel}>
            <h2 className="p-l max-w-[34.25rem] !leading-[1.2]">{studio.who}</h2>
          </GridStudio>
          <div className="space-65" />
          <div className="space-65" />
          <h2 className="h2-style balance">
            {studio.claim[0]}
            <br />
            {studio.claim[1]}
          </h2>
          <div className="space-65" />
          <GridStudio label={studio.whatLabel}>
            <span />
          </GridStudio>
          <div className="space-65" />
          <div className="grid grid-cols-3 gap-x-[1rem] gap-y-[4.375rem] max-lg:grid-cols-2 max-md:flex max-md:flex-col max-md:gap-[1rem]">
            {studio.services.map((s) => (
              <ServiceCard key={s.n} n={s.n} title={s.title} text={s.text} picId={s.pic} />
            ))}
          </div>
          <div className="space-150 mob-50" />
          <div className="space-24" />
          <GridStudio label={studio.howLabel}>
            <h2 className="h2-style balance">
              {studio.how[0]}
              <br />
              {studio.how[1]}
            </h2>
            <div className="space-24" />
            <Button href="/method">{studio.howCta}</Button>
          </GridStudio>
          <div className="space-150 mob-50 max-sm:hidden" />
          <div className="space-44" />
          <GridStudio>
            <div className="grid-12 max-lg:flex max-lg:justify-between max-lg:gap-[1rem] max-sm:flex-col">
              {studio.howNotes.map((n, i) => (
                <div key={i} className={`p-m ${i === 0 ? "col-span-6" : "col-span-6"}`}>
                  {n[0]}
                  <br />
                  {n[1]}
                </div>
              ))}
            </div>
          </GridStudio>
        </div>
      </section>

      {/* Clients + showreel */}
      <section className="bg-white text-black">
        <div className="container-x pb-[5.3125rem]">
          <div className="space-65" />
          <GridStudio label={studio.clientsLabel}>
            <h2 className="p-m">{studio.clientsText}</h2>
            <div className="space-24" />
            <h2 className="p-xl">
              {studio.clients.map((c, i) => (
                <span key={c}>
                  {c}
                  {i < studio.clients.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </GridStudio>
          <div className="space-44" />
          <GridStudio>
            <div className="flex w-full flex-col items-start justify-end">
              <div className="relative w-full overflow-hidden rounded-[0.25rem] bg-black">
                <AutoVideo src={video.showreel} className="relative block h-auto w-full" />
              </div>
              <div className="space-44 max-lg:hidden" />
              <Button href="/works" variant="white" className="max-lg:mt-[2rem]">
                {studio.allWorksCta}
              </Button>
            </div>
          </GridStudio>
        </div>
      </section>

      {/* Awards, quote, team */}
      <section className="bg-white text-black">
        <div className="container-x pb-[5.3125rem]">
          <div className="space-65" />
          <GridStudio label={studio.awardsLabel}>
            <span />
          </GridStudio>
          <div className="space-24" />
          <GridStudio
            reverseOnMobile
            label={
              <div className="relative h-[22rem] w-full max-w-[22rem] overflow-hidden rounded-[0.25rem]">
                <Image src={img.studioAwards} alt="Geometric building facade" fill sizes="22vw" className="object-cover" />
              </div>
            }
          >
            <ul className="list-none p-0">
              {studio.awards.map((a) => (
                <li key={a.title}>
                  <div className="flex w-full items-center justify-between max-sm:items-start">
                    <p className="text-[1.875rem] font-medium leading-[1.2] max-sm:text-[1.5rem]">{a.title}</p>
                    <div className="p-m">{a.count}</div>
                  </div>
                </li>
              ))}
              <li className="mt-[3.125rem]">
                <Button href="/awards" variant="white">
                  {studio.awardsCta}
                </Button>
              </li>
            </ul>
          </GridStudio>
          <div className="space-44" />
          <div className="space-150 mob-50" />
          <GridStudio label={studio.quoteLabel}>
            <h2 className="h2-style balance">{studio.quote}</h2>
            <div className="space-24" />
            <div className="p-s">{studio.quoteBy}</div>
          </GridStudio>
          <div className="space-150 mob-50" />
          <div className="space-44" />
          <GridStudio label={studio.teamLabel}>
            <div className="grid grid-cols-2 gap-y-[4.375rem] max-md:grid-cols-1 max-md:gap-y-[2rem] max-sm:grid-cols-2">
              {studio.team.map((t, i) => (
                <div key={i}>
                  <h2 className="label-mono mb-[1rem]">{t.title}</h2>
                  <div className="p-m">
                    {t.lines.map((l, j) => (
                      <span key={j}>
                        {l}
                        {j < t.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GridStudio>
        </div>
      </section>

      <Faq items={faqSets.studio} />
      <Footer />
    </>
  );
}
