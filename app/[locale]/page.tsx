import HeroSection from "@/features/home/components/hero";
import IntroSection from "@/features/home/components/intro-section";
import PackageSection from "@/features/home/components/package-section";
import Testimonials from "@/features/home/components/testimonials";
import WhyUs from "@/features/home/components/why-us";
import Works from "@/features/home/components/works";
import { getHero } from "@/features/home/services/get-hero";

export default async function Home() {
  const heroData = await getHero();
  return (
    <>
      {
        heroData.data && (
          <>
            <HeroSection heroData={heroData.data} />
            <IntroSection aboutData={heroData.data?.about} />
          </>
        )
      }
     
     
      <PackageSection />
      <WhyUs />
      <Works />
      <Testimonials />
    </>
  );
}
