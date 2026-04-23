import { Button } from "@/components/ui/button";
import { LucideClipboardCheck } from "lucide-react";
import Image from "next/image";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { RiFlashlightLine } from "react-icons/ri";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useTranslations } from "next-intl";
import StartNowBtn from "@/features/shared/components/start-now-btn";
import { HeroData } from "../types";

interface HeroSectionProps {
  heroData: HeroData;
}
export default function HeroSection({ heroData }: HeroSectionProps) {
  const t = useTranslations("Hero");

  return (
    <div
      className={` bg-cover bg-center bg-no-repeat w-full min-h-screen `}
      style={{
        backgroundImage: `url(${heroData.background_image})` || `/hero-1.png`,
      }}
    >
      <div className="pb-20 bg-linear-to-l from-black/90 via-black/70 to-black/50 min-h-screen w-full flex flex-col justify-between pt-32 relative space-y-10">
        {/* Main Content Area */}
        <div className="container flex-1 flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Right Side (RTL) - Text Content */}
            <div className="space-y-4 max-w-2xl w-full">
              {/* label */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-brand"></div>
                <p className="text-white lg:text-lg">
                  {heroData?.subtitle || t("label")}
                </p>
              </div>

              {/* title */}
              <h1 className="text-white text-5xl lg:text-6xl font-bold leading-relaxed uppercase">
                {heroData?.title}
              </h1>

              {/* description */}
              <p className="text-gray-400 text-lg">
                {heroData?.description || t("description")}
              </p>

              {/* buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <StartNowBtn />

                <Button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 h-12 lg:h-14 lg:text-lg rounded-full font-bold hover:bg-white hover:text-black transition-all">
                  {t("view_packages")}
                  <HiOutlineSquare3Stack3D />
                </Button>
              </div>
            </div>

            {/* Left Side (RTL) - Floating Elements Placeholder for Desktop Balance (Optional, keeping it flex friendly) */}
            <div className="hidden lg:block lg:w-1/3"></div>
          </div>
        </div>

        {/* Floating Social Sidebar  */}
        <div className="hidden lg:flex flex-col items-end gap-2 absolute inset-e-[7.5%] top-1/2 -translate-y-1/2">
          {/* Text block fixed: using a relative spacer so rotation doesn't break flex alignment */}
          <div className="relative w-14 h-32 flex items-center justify-center">
            <div className="-rotate-90 ltr:rotate-90 absolute whitespace-nowrap ">
              <p className="text-lg font-bold text-white">{t("follow_us")}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <Image
                src="/instagram.svg"
                alt="instagram"
                width={28}
                height={28}
                className="w-8 h-8"
              />
            </a>
            <a
              href="#"
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <Image
                src="/facebook.svg"
                alt="facebook"
                width={28}
                height={28}
                className="w-8 h-8"
              />
            </a>
          </div>
          {/* conters */}
          <div className="w-full lg:w-auto flex flex-col lg:items-start gap-4 ">
            <p className="text-gray-300 font-medium">{t("our_numbers")}</p>
            <div className="flex items-center gap-8">
              {heroData?.stats?.map((stat, i) => (
                <div key={i} className="flex flex-col justify-end h-full">
                  <div className="text-white text-5xl font-bold flex items-end ltr:flex-row-reverse">
                    {stat.count}
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* responsive icons */}
        <div className="lg:hidden flex flex-row items-center justify-center gap-6 mt-8">
          <p className="text-lg font-bold text-white">{t("follow_us")}</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Image
                src="/instagram.svg"
                alt="instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Image
                src="/facebook.svg"
                alt="facebook"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        {/* Features (Right/Center Area in RTL) */}
        <div className="max-lg:hidden container flex flex-wrap lg:flex-nowrap items-center justify-between  ">
          <div className="flex items-center gap-3 text-white">
            <LucideClipboardCheck className="size-10 lg:size-12 text-brand" />
            <p className="text-base lg:text-lg font-bold">
              {t("instant_booking")}
            </p>
          </div>
          <div className="flex items-center gap-3 text-white">
            <RiFlashlightLine className="size-10 lg:size-12 text-brand" />
            <p className="text-base lg:text-lg font-bold">{t("fast_speed")}</p>
          </div>
          <div className="flex items-center gap-3 text-white">
            <FaHandHoldingUsd className="size-10 lg:size-12 text-brand" />
            <p className="text-base lg:text-lg font-bold">
              {t("competitive_prices")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
