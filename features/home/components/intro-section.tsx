import StartNowBtn from "@/features/shared/components/start-now-btn";
import { Calendar, Droplets, Play, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { About } from "../types";

interface IntroSectionProps {
  aboutData: About;
}
export default function IntroSection({ aboutData }: IntroSectionProps) {
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
               {aboutData?.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              {aboutData?.description}
            </p>

            {/* Feature Tokens Row */}
            <div className="flex flex-wrap items-center gap-8 py-2">
              {aboutData?.features?.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                    <Image
                      src={feature.image}
                      alt="feature"
                      width={100}
                      height={100}
                      className="size-10 "
                    />
                  <span className="text-gray-800 font-bold text-sm lg:text-base">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <StartNowBtn />
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
                <a href={aboutData?.video_url} target="_blank" rel="noopener noreferrer" className="size-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:bg-white/30 group-hover:opacity-100">
                  <div className="size-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Play className="size-8 text-white fill-current translate-x-1" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
