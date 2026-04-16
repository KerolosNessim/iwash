import SectionHeader from '@/features/shared/components/section-header';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";


export default function PackageSection() {
  const t = useTranslations("PackageSection")
  return (
    <div className="bg-gray-100/50 rounded-[3rem] lg:py-24 py-12">
      <div className="container">
        <div className="flex items-end justify-between gap-6 mb-12 max-lg:flex-col max-lg:items-start">
          <SectionHeader
            icon={<HiOutlineSquare3Stack3D className=" size-4" />}
            badgeText={t("badgeText")}
            title={t("title")}
            highlight={t("highlight")}
            description={t("description")}
          />
          <p className="shrink-0 text-sm font-bold text-gray-500 flex items-center gap-2 ">
            <CheckCircle className=" size-4" />{" "}
            {t("quality_guarantee")}
          </p>
        </div>

        <div className="flex gap-10 flex-wrap justify-center items-start pt-4">

        </div>
      </div>
    </div>
  );
}
