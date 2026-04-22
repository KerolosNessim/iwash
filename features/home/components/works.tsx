import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionHeader from "@/features/shared/components/section-header";
import { useTranslations } from "next-intl";
import { MdStars } from "react-icons/md";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { useLocale } from "next-intl";
export default function Works() {
  const t = useTranslations("works");
  const locale = useLocale();
  const images = [
    "/work-1.png",
    "/work-2.png",
    "/work-3.png",
    "/work-4.png",
    "/work-5.png",
  ];
  return (
    <div className="py-16">
      <Carousel
        className="space-y-16"
        opts={{
          loop: true,
          align: "center",
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        <div className="container flex items-center justify-between">
          <SectionHeader
            title={t("title")}
            badgeText={t("badgeText")}
            icon={<MdStars className="size-4" />}
            badgeColor="bg-red-500"
          />
          <div className="flex justify-end gap-1  ltr:flex-row-reverse">
            <CarouselNext className="static translate-x-0 border-none shadow-none hover:bg-transparent hover:text-brand hover:scale-115 transition-all duration-300">
              <BsArrowRight className="size-6" />
            </CarouselNext>
            <CarouselPrevious className="static translate-x-0 border-none shadow-none hover:bg-transparent hover:text-brand hover:scale-115 transition-all duration-300 ">
              <BsArrowLeft className="size-6" />
            </CarouselPrevious>
          </div>
        </div>
        <CarouselContent className="">
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-[75%] md:basis-1/2 lg:basis-1/4">
              <Image src={image} alt="work" className="w-full rounded-[2rem] lg:h-[70vh] h-[50vh] object-cover" width={500} height={500}/>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
