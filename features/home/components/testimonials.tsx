"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import SectionHeader from "@/features/shared/components/section-header";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import Autoplay from "embla-carousel-autoplay";
import { useTestimonials } from "../hooks/useTestimonials";
export default function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <div className="py-16 container flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div id="reviews" className="scroll-mt-20 py-16">
      <Carousel
        className="space-y-16"
        opts={{
          loop: true,
          align: "center",
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <div className="container flex items-center justify-between">
          <SectionHeader
            title={t("title")}
            highlight={t("highlight")}
            badgeText={t("badgeText")}
            icon={<MdStars className="size-4" />}
            badgeColor="bg-red-500"
          />
        </div>
        <CarouselContent>
          {testimonials.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[90%] md:basis-1/2 lg:basis-[32%]"
            >
              <div className="bg-gray-100 p-8 rounded-3xl space-y-4">
                {/* images  */}
                <div className="flex gap-2 ">
                  <div className="basis-1/2 space-y-2">
                    <Image
                      width={100}
                      height={100}
                      alt="before"
                      src={item.images.before_image || "/work-2.png"}
                      className="w-full h-50 object-cover rounded-2xl"
                    />
                    <p className="text-center">{t("content.before")}</p>
                  </div>
                  <div className="basis-1/2 space-y-2">
                    <Image
                      width={100}
                      height={100}
                      alt="after"
                      src={item.images.after_image || "/work-1.png"}
                      className="w-full h-50 object-cover rounded-2xl"
                    />
                    <p className="text-center">{t("content.after")}</p>
                  </div>
                </div>

                {/* user info */}
                <div className="flex items-center justify-between">
                  {/* user name and image */}
                  <div className="flex items-center gap-2">
                    <Image
                      width={100}
                      height={100}
                      alt={item.customer_name}
                      src={item.images.customer_avatar || "/user.jpg"}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <p className="text-sm font-bold">{item.customer_name}</p>
                  </div>
                  {/* location  */}
                  <div className="flex items-center gap-1 bg-white p-2 rounded">
                    <CiLocationOn />
                    <p className="text-sm font-medium">
                      {item.location}
                    </p>
                  </div>
                </div>
                {/* user review  */}
                <div>
                  <p className="leading-loose font-medium line-clamp-3">
                    {item.content}
                  </p>
                </div>
                {/* review stars */}
                <div className="flex items-center justify-between ">
                  <div className="flex gap-1 p-2 rounded">
                    <div className="flex gap-0.5">
                      <FaStar  className={"text-yellow-500"} />
                    </div>
                    <p className="text-sm font-medium">{item.rating}</p>
                  </div>
                  <FaQuoteLeft className="size-6 ltr:rotate-180" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
