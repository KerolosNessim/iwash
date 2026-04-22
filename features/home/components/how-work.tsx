import SectionHeader from "@/features/shared/components/section-header";
import {
  LucidePaintbrush,
  MousePointerClick,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HowWork() {
  const t = useTranslations("HowWork");
  return (
    <div className="container py-16">
      <SectionHeader
        icon={<LucidePaintbrush className=" size-4" />}
        badgeText={t("badgeText")}
        title={t("title")}
        description={t("description")}
        alignment="center"
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-20 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center relative flex-1 max-w-[250px]">
          <div className="hidden md:block absolute top-[-60px] ltr:left-0 rtl:right-0 text-5xl font-bold">
            01
          </div>
          <div className="bg-brand p-4 rounded-3xl mb-6 shadow-sm">
            <MousePointerClick size={28} />
          </div>
          <h3 className="font-bold text-xl mb-3">{t("step1.title")}</h3>
          <p className="text-sm text-gray-500 font-medium">
            {t("step1.description")}
          </p>
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:flex flex-1 justify-center relative shrink-0 -translate-y-8">
          <Image
            src="/dashed-arrow.svg"
            alt="arrow"
            width={160}
            height={50}
            className="w-[120px] lg:w-[160px] object-contain ltr:rotate-180"
          />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center relative flex-1 max-w-[250px]">
          <div className="bg-brand p-4 rounded-3xl mb-6 shadow-sm">
            <CalendarDays size={28} />
          </div>
          <h3 className="font-bold text-xl mb-3">{t("step2.title")}</h3>
          <p className="text-sm text-gray-500 font-medium">
            {t("step2.description")}
          </p>
          <div className="hidden md:block absolute bottom-[-60px] text-5xl font-bold">
            02
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:flex flex-1 justify-center relative shrink-0 -translate-y-8">
          <Image
            src="/long-arrow.svg"
            alt="arrow"
            width={160}
            height={50}
            className="w-[120px] lg:w-[160px] object-contain ltr:rotate-180"
          />
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center relative flex-1 max-w-[250px]">
          <div className="hidden md:block absolute top-[-60px] ltr:right-0 rtl:left-0 text-5xl font-bold">
            03
          </div>
          <div className="bg-brand p-4 rounded-3xl mb-6 shadow-sm">
            <MapPin size={28} />
          </div>
          <h3 className="font-bold text-xl mb-3">{t("step3.title")}</h3>
          <p className="text-sm text-gray-500 font-medium">
            {t("step3.description")}
          </p>
        </div>
      </div>
    </div>
  );
}
