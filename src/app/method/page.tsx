import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import GridStudio from "@/components/GridStudio";
import Prefooter from "@/components/Prefooter";
import Button from "@/components/ui/Button";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { contactUrl, faqSets, method } from "@/content/site";
import { img } from "@/content/media";

export const metadata: Metadata = { title: "Method" };

export default function MethodPage() {
  return (
    <>
      <PageHero
        stacked
        title={method.title}
        subtitle={method.subtitle}
        left={
          <p className="text-[0.875rem] font-medium leading-[1.2]">
            {method.label[0]}
            <br />
            {method.label[1]}
          </p>
        }
        description={method.intro}
        image={img.methodHero}
        imageAlt="A jellyfish drifting in dark water"
      />

      {method.steps.map((step) => (
        <section key={step.n} className="bg-white text-black">
          <div className="container-x pb-[5.3125rem]">
            <div className="flex w-full items-start justify-between">
              <h2 className="h2-style">{step.title}</h2>
              <h2 className="h2-style">{step.n}</h2>
            </div>
            <div className="mt-[1.5rem] h-[1px] w-full bg-black/30" />
            <div className="space-65" />
            <GridStudio label={<div className="p-xl">{step.claim}</div>}>
              <div className="grid grid-cols-2 gap-y-[4.375rem] max-md:grid-cols-1 max-md:gap-y-[2rem]">
                <div>
                  <h2 className="label-mono mb-[1rem]">WHAT we do</h2>
                  <div className="p-m max-w-[23.75rem]">{step.what}</div>
                </div>
                <div>
                  <h2 className="label-mono mb-[1rem]">WHAT YOU RECEIVE</h2>
                  <div className="p-m max-w-[23.75rem]">{step.receive}</div>
                </div>
              </div>
            </GridStudio>
          </div>
        </section>
      ))}

      <section className="bg-white text-black">
        <div className="container-x pb-[5.3125rem]">
          <div className="space-65" />
          <GridStudio label={method.augmentedLabel}>
            <span />
          </GridStudio>
          <div className="space-24" />
          <GridStudio
            reverseOnMobile
            label={
              <div className="relative h-[22rem] w-full max-w-[22rem] overflow-hidden rounded-[0.25rem]">
                <Image src={img.augmented} alt="A long corridor in a modern building" fill sizes="22vw" className="object-cover" />
              </div>
            }
          >
            <p className="p-xl">{method.augmented}</p>
            <div className="space-44" />
            <Button href={contactUrl} variant="white">
              book a call
            </Button>
          </GridStudio>
        </div>
      </section>

      <Prefooter label={method.changesLabel} quote={method.changes} by={method.changesBy}>
        <div className="space-24" />
        <Button href="/studio">The studio</Button>
        <div className="space-150 mob-50" />
        <div className="-ml-[0] grid-12 max-lg:flex max-lg:flex-col max-lg:gap-[2rem]">
          <div className="col-span-3 p-m">{method.notLabel}</div>
          <h2 className="p-xl col-start-5 col-end-13">
            {method.not.map((l, i) => (
              <span key={i}>
                {l}
                {i < method.not.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>
      </Prefooter>

      <Faq items={faqSets.method} />
      <Footer />
    </>
  );
}
