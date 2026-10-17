import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import NextProject from "@/components/NextProject";
import Button from "@/components/ui/Button";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { coverUrl, getWork, nextWork, works } from "@/content/works";
import { contactUrl, emailUrl, home } from "@/content/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  return { title: work ? work.title : "Work", description: work?.tagline };
}

export default function WorkPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <WorkContent params={params} />
    </Suspense>
  );
}

async function WorkContent({ params }: { params: Params }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();
  const next = nextWork(work);

  return (
    <>
      <PageHero
        title={work.title}
        subtitle={String(work.number)}
        hideSubtitleOnMobile
        left={
          <>
            <p className="p-l">{work.year}</p>
            <p className="text-[0.875rem] font-medium capitalize">{work.tags}</p>
          </>
        }
        description={work.description}
        image={coverUrl(work, 1600, 1000)}
        imageAlt={`${work.title} — ${work.tagline}`}
      />

      <section className="bg-white text-black">
        <div className="container-x pb-[2.25rem]">
          <div className="space-150 max-lg:hidden" />
          <div className="space-65" />
          <div className="p-m flex items-start justify-between gap-[6.25rem] max-md:flex-col max-md:gap-[1.25rem]">
            <div className="flex-none">( Concept )</div>
            <div className="max-w-[27rem] max-lg:max-w-none">{work.concept}</div>
          </div>
          <div className="space-44 max-lg:pt-[4.0625rem]" />

          <Gallery items={work.gallery} title={work.title} />

          <div className="mt-[0.875rem] flex items-start justify-between gap-[0.3rem] max-md:items-center">
            <Link href="/works" className="view-all">
              <span>All Works</span>
              <ArrowIcon />
            </Link>
            <div className="flex items-center gap-[0.4rem] max-md:hidden">
              <div>Crédits :</div>
              <div>{work.credits}</div>
            </div>
          </div>

          <div className="space-110" />
          <div className="flex flex-col items-center gap-[1.25rem]">
            <div className="h4-style">
              {home.footerTitle[0]} {home.footerTitle[1]}
            </div>
            <div className="flex items-center gap-[0.75rem] max-sm:flex-col">
              <Button href={contactUrl} variant="white">
                book a call
              </Button>
              <Button href={emailUrl} variant="white" icon="email">
                drop us an email
              </Button>
            </div>
          </div>

          <div className="space-87" />
          <NextProject next={next} />
        </div>
      </section>
    </>
  );
}
