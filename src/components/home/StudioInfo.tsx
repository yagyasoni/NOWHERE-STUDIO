import Image from "next/image";
import { home } from "@/content/site";
import { img } from "@/content/media";
import Formes from "./Formes";
import Parallax from "../ui/Parallax";

export default function StudioInfo() {
  return (
    <section className="relative bg-black text-white max-sm:overflow-clip">
      <div className="sep-blur" />
      <div className="container-x">
        <div className="space-87" />

        <div className="p-l grid grid-cols-[0.75fr_1fr] leading-[1.2] max-md:flex max-md:flex-col">
          <div>{home.studioLabel}</div>
          <div className="max-w-[35rem] max-lg:max-w-none max-md:mt-[2.5rem]">{home.studioText}</div>
        </div>

        <div className="space-24 max-md:hidden" />
        <div className="space-24 max-md:hidden" />
        <div className="space-24" />
        <div className="space-24" />

        <div className="grid grid-cols-[0.75fr_1fr] max-lg:mb-[5.625rem] max-md:flex max-md:flex-col">
          <div className="mr-[8.125rem] max-md:mr-0">
            <div className="relative mb-[1.25rem] h-[13.5rem] w-[13.5rem] overflow-hidden rounded-[0.25rem]">
              <Image src={img.studioSmall} alt="Cardboard texture" fill sizes="14vw" className="object-cover" />
            </div>
            <div className="text-[1.125rem] font-normal">
              {home.studioTail[0]}
              <br />
              {home.studioTail[1]}
            </div>
          </div>
          <Parallax
            y={-60}
            className="relative mb-[1.25rem] h-[26.25rem] w-[43.125rem] overflow-hidden rounded-[0.25rem] max-lg:w-full max-md:order-first max-md:mb-[2.5rem]"
          >
            <Image src={img.studioLarge} alt="A jellyfish drifting in dark water" fill sizes="(min-width: 992px) 44vw, 100vw" className="object-cover" />
          </Parallax>
        </div>

        <div className="space-150 max-md:hidden" />
        <div className="space-87" />
        <h2 className="h1-home">
          {home.formsTitle[0]}
          <br />
          {home.formsTitle[1]}
        </h2>
        <div className="space-87" />

        <div className="grid grid-cols-[0.75fr_1fr] text-[1.125rem] font-normal leading-[1.2] max-md:flex max-md:flex-col">
          <div className="mr-[8.125rem] max-md:mr-0">
            <div>{home.designLabel}</div>
            <div className="h-0 w-[13.5rem] max-sm:hidden" />
          </div>
          <div className="overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="whitespace-nowrap">
                {home.designList.map((item) => (
                  <div key={item} className="flex items-center gap-[0.75rem]">
                    <span className="list-dot" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
              <div className="max-lg:hidden">
                {home.designTail[0]}
                <br />
                {home.designTail[1]}
              </div>
            </div>
          </div>
          <div className="hidden pt-[2rem] max-lg:block">
            {home.designTail[0]}
            <br />
            {home.designTail[1]}
          </div>
        </div>

        <div className="space-87" />
        <Formes />

        <div className="-mt-[5.4375rem] grid grid-cols-[0.75fr_1fr] text-[1.125rem] font-normal leading-[1.2] max-md:mt-0 max-md:flex max-md:flex-col max-md:gap-[2.5rem]">
          <div className="mr-[8.125rem] max-md:mr-0">
            <div className="max-sm:mb-[3rem]">{home.peopleLabel}</div>
            <div className="h-0 w-[13.5rem] max-sm:hidden" />
          </div>
          <div className="overflow-hidden max-sm:w-full">
            <div className="grid grid-cols-2">
              {home.team.map((group) => (
                <div key={group.title}>
                  <h2 className="label-mono mb-[1rem] max-sm:max-w-[8rem] max-sm:text-balance">{group.title}</h2>
                  {group.people.map((p) => (
                    <div key={p} className="flex items-center gap-[0.75rem]">
                      <div>{p}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-87 max-md:hidden" />
      </div>
    </section>
  );
}
