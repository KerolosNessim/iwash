import HeroSection from "@/features/home/components/hero";
import IntroSection from "@/features/home/components/intro-section";
import PackageSection from "@/features/home/components/package-section";
import Testimonials from "@/features/home/components/testimonials";
import WhyUs from "@/features/home/components/why-us";
import Works from "@/features/home/components/works";

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <PackageSection />
      <WhyUs />
      <Works />
      <Testimonials />
    </>
  );
}
