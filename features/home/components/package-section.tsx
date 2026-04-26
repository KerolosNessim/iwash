import SectionHeader from "@/features/shared/components/section-header";
import { CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { getPackages } from "../services/get-packages";
import HowWork from "./how-work";
import PackageCard from "./packeage-card";

export default async function PackageSection() {
  const t = await getTranslations("PackageSection");
  const response = await getPackages();
const setting=response.data?.settings??{}
const packages = response.data?.items ?? [];

  return (
    <div id="packages" className="scroll-mt-20 bg-gray-100/50 rounded-[3rem] py-16 space-y-16">
      <div className="container">
        <div className="flex items-end justify-between gap-6 mb-12 max-lg:flex-col max-lg:items-start">
          <SectionHeader
            icon={<HiOutlineSquare3Stack3D className=" size-4" />}
            badgeText={setting?.badge_text?? t("badgeText")}
            title={setting?.title?? t("title")}
            description={setting?.description?? t("description")}
          />
          <p className="shrink-0 text-sm font-bold text-gray-500 flex items-center gap-2 ">
            <CheckCircle className=" size-4" /> {t("quality_guarantee")}
          </p>
        </div>

        <div className="lg:max-w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} item={pkg} />
          ))}
        </div>
      </div>

      <HowWork />
    </div>
  );
}
