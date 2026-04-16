import { Button } from "@/components/ui/button";
import { Calendar, Droplets, Users, Play } from "lucide-react";
import Image from "next/image";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { useTranslations } from "next-intl";

export default function IntroSection() {
  const t = useTranslations("IntroSection");

  return (
    <section className="lg:py-16 py-8 bg-white overflow-hidden rounded-t-3xl -translate-y-10">
      <div className="container ">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-8 ">
          {/* Content side (Right in RTL, Left visually) */}
          <div className=" lg:space-y-10 space-y-6 ">
            {/* logo */}
            <Image
              src="/logo-blue.svg"
              alt="logo"
              width={100}
              height={100}
              className="w-24 h-24"
            />

            {/* Title with brand highlight */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-black text-[#1a1a1a] leading-[1.2]">
                {t("title_part1")} <span className="text-brand">{t("title_highlight")}</span>
                <br />
                {t("title_part2")}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              {t("description")}
            </p>

            {/* Feature Tokens Row */}
            <div className="flex flex-wrap items-center gap-8 py-2">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100/50">
                  <Calendar className="size-5 text-orange-500" />
                </div>
                <span className="text-gray-800 font-bold text-sm lg:text-base">
                  {t("flexibility")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100/50">
                  <Users className="size-5 text-purple-500" />
                </div>
                <span className="text-gray-800 font-bold text-sm lg:text-base">
                  {t("professional_team")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-full bg-[#e8f7ec] flex items-center justify-center border border-[#d1f0d8]">
                  <Droplets className="size-5 text-[#2cb657]" />
                </div>
                <span className="text-gray-800 font-bold text-sm lg:text-base">
                  {t("complete_equipment")}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Button className="bg-brand text-black px-8 h-12 lg:h-14 lg:text-lg rounded-full font-bold hover:bg-brand/90 hover:scale-105 transition-all">
                {t("start_now")}
                <TbArrowBigLeftLinesFilled className="ltr:-rotate-180" />
              </Button>
            </div>
          </div>

          {/* Media side (Left in RTL, Right visually) */}
          <div className=" w-full h-full max-lg:min-h-96">
            <div className="relative h-full rounded-[3.5rem] overflow-hidden shadow group">
              <Image
                src="/hero-2.png"
                alt="Car interior steaming"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

              {/* Central Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="size-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:bg-white/30 group-hover:opacity-100">
                  <div className="size-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Play className="size-8 text-white fill-current translate-x-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
