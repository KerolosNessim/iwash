import SectionHeader from "@/features/shared/components/section-header";
import StartNowBtn from "@/features/shared/components/start-now-btn";
import {
  LucideShieldCheck,
  LucideSparkles,
  LucideStar,
  LucideUsers,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { IoFlashOutline } from "react-icons/io5";

export default function WhyUs() {
  const t = useTranslations("WhyUs");

  const reasons = [
    {
      icon: LucideSparkles,
      title: t("reason1.title"),
      description: t("reason1.description"),
    },
    {
      icon: LucideShieldCheck,
      title: t("reason2.title"),
      description: t("reason2.description"),
    },
    {
      icon: LucideUsers,
      title: t("reason3.title"),
      description: t("reason3.description"),
    },
    {
      icon: LucideStar,
      title: t("reason4.title"),
      description: t("reason4.description"),
    },
  ];

  return (
    <div className="container py-16 space-y-12">
      <SectionHeader
        icon={<IoFlashOutline className="size-4 text-brand" />}
        badgeText={t("badgeText")}
        title={t("title")}
        highlight={t("highlight")}
        description={t("description")}
        alignment="center"
      />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-gray-100 p-10 rounded-[3rem] flex flex-col items-center gap-5 lg:odd:mt-26 lg:h-fit"
          >
            <div className="size-17 bg-white rounded-3xl flex items-center justify-center">
              <reason.icon className="size-8 text-blue-600" />
            </div>
            <div className="text-center space-y-5">
              <h3 className="text-xl font-semibold">{reason.title}</h3>
              <p className="text  font-extralight">{reason.description}</p>
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
