import SectionHeader from "@/features/shared/components/section-header";
import { LucidePaintbrush } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { getWorkSteps } from "../services/get-steps";

export default async function HowWork() {
  const data = await getWorkSteps();
  const t = await getTranslations("HowWork");
  
  const steps = data?.data?.steps || [];

  return (
    <div className="container py-16">
      <SectionHeader
        icon={<LucidePaintbrush className=" size-4" />}
        badgeText={t("badgeText")}
        title={data?.data?.title || t("title")}
        description={data?.data?.subtitle || t("description")}
        alignment="center"
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-20 relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Item */}
            <div className="flex flex-col items-center text-center relative flex-1 max-w-[250px]">
              {/* Alternating Index Position (Top for even, Bottom for odd) */}
              {index % 2 === 0 && (
                <div className="hidden md:block absolute top-[-60px] ltr:left-0 rtl:right-0 text-5xl font-bold opacity-20">
                  {String(index + 1).padStart(2, "0")}
                </div>
              )}

                <Image 
                  src={step.image || "/logo-blue.svg"} 
                  alt={step.title} 
                  width={32} 
                  height={32} 
                  className="size-14 object-contain mb-6 "
                />

              <h3 className="font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-sm text-gray-500 font-medium">
                {step.description}
              </p>

              {index % 2 !== 0 && (
                <div className="hidden md:block absolute bottom-[-60px] text-5xl font-bold opacity-20">
                  {String(index + 1).padStart(2, "0")}
                </div>
              )}
            </div>

            {/* Arrow between steps (not after the last step) */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex flex-1 justify-center relative shrink-0 -translate-y-8">
                <Image
                  src={index % 2 === 0 ? "/dashed-arrow.svg" : "/long-arrow.svg"}
                  alt="arrow"
                  width={160}
                  height={50}
                  className={cn(
                    "w-[120px] lg:w-[160px] object-contain ltr:rotate-180",
                    index % 2 !== 0 && "rotate-12"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
