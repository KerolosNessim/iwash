import SectionHeader from "@/features/shared/components/section-header";
import StartNowBtn from "@/features/shared/components/start-now-btn";
import {
  LucideShieldCheck,
  LucideSparkles,
  LucideStar,
  LucideUsers,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { IoFlashOutline } from "react-icons/io5";
import { getWhyChoose } from "../services/get-why-choose";
import Image from "next/image";

export default async function WhyUs() {
  const t =  await getTranslations("WhyUs");
  const data = await getWhyChoose();



  return (
    <div className="container py-16 space-y-12">
      <SectionHeader
        icon={<IoFlashOutline className="size-4 text-brand" />}
        badgeText={ t("badgeText")}
        title={ data?.data?.title || t("title")}
        description={data?.data?.subtitle || t("description")}
        alignment="center"
      />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {data?.data?.items.map((reason, index) => (
          <div
            key={index}
            className="bg-gray-100 p-10 rounded-[3rem] flex flex-col items-center gap-5 lg:odd:mt-26 lg:h-fit"
          >
            <div className="size-17 bg-white rounded-3xl flex items-center justify-center">
              <Image 
                src={reason.image || "/logo-blue.svg"} 
                alt={reason.title} 
                width={32} 
                height={32} 
                className="size-14 object-contain"
              />
            </div>
            <div className="text-center space-y-5">
              <h3 className="text-xl font-semibold">{reason?.title}</h3>
              <p className="text  font-extralight">{reason?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <StartNowBtn className="mx-auto" />
      </div>
    </div>
  );
}
