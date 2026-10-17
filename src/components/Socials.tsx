import { socials } from "@/content/site";

/** Social names are shown as plain labels: this prototype links to no real account. */
export default function Socials({ className = "" }: { className?: string }) {
  const [li, ig] = socials;
  return (
    <div className={`flex items-center gap-[1.375rem] ${className}`}>
      <div className="flex items-center gap-[0.875rem]">
        <span className="link-sm hidden max-lg:block">{li.short}</span>
        <span className="link-sm max-lg:hidden">{li.label}</span>
        <span className="link-sm pointer-events-none">/</span>
        <span className="link-sm max-lg:hidden">{ig.label}</span>
        <span className="link-sm hidden max-lg:block">{ig.short}</span>
      </div>
      <span className="link-sm rounded-[4px] bg-white px-[0.25rem] py-[0.25rem] text-black">EN</span>
    </div>
  );
}
