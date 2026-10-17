import Hero from "@/components/home/Hero";
import Showreel from "@/components/home/Showreel";
import WorksSection from "@/components/home/WorksSection";
import Manifesto from "@/components/home/Manifesto";
import StudioInfo from "@/components/home/StudioInfo";
import Glitch from "@/components/home/Glitch";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { faqSets } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Showreel />
      <WorksSection />
      <Manifesto />
      <StudioInfo />
      <Glitch />
      <Faq items={faqSets.home} />
      <Footer />
    </>
  );
}
