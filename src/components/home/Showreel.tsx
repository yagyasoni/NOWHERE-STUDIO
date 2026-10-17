import { home } from "@/content/site";
import { video } from "@/content/media";
import AutoVideo from "../ui/AutoVideo";

export default function Showreel() {
  return (
    <section className="relative z-[2] -mt-[100vh] bg-white text-black max-lg:mt-0">
      <div className="container-x pb-[5.3125rem]">
        <div className="space-150 mob-50" />
        <h2 className="h1-home balance">
          {home.showreelTitle[0]}
          <br />
          {home.showreelTitle[1]}
        </h2>
        <div className="space-65" />
        <div className="relative flex h-[58rem] min-h-[58rem] items-end justify-end max-lg:h-auto max-lg:min-h-0 max-lg:flex-col max-lg:items-start max-lg:gap-[2.375rem]">
          <div className="relative flex h-full w-full items-end justify-end overflow-hidden rounded-[0.25rem] bg-black max-lg:h-auto">
            <AutoVideo
              src={video.showreel}
              className="absolute inset-0 z-[1] h-full w-full object-cover max-lg:relative max-lg:h-auto"
            />
          </div>
          <div className="p-m absolute bottom-0 left-0 z-[2] flex gap-[6.25rem] px-[1.25rem] pb-[1.625rem] text-white max-lg:relative max-lg:p-0 max-lg:text-black max-sm:flex-col max-sm:gap-[2.5rem]">
            <div>{home.showreelLabel}</div>
            <div className="max-w-[21.625rem]">{home.showreelText}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
