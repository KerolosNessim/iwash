"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import * as React from "react";
import { Check, ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsPatchCheck } from "react-icons/bs";
import { FaApple, FaGooglePlay } from "react-icons/fa";

interface RegisterSuccessProps {
  onClose: () => void;
}

export default function RegisterSuccess({ onClose }: RegisterSuccessProps) {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto py-8 text-center animate-in fade-in zoom-in duration-300">
      {/* Success Icon */}
      <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center shadow-lg shadow-brand/20">
        <BsPatchCheck className="text-white w-12 h-12" />
      </div>

      {/* Text Content */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-brand">
          {t("register_success.title")}
        </h1>
        <div className="space-y-1">
          <p className="text-lg font-medium text-muted-foreground">
            {t("register_success.welcome")}
          </p>
          <p className="text-muted-foreground max-w-[280px] mx-auto text-sm leading-relaxed">
            {t("register_success.description")}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={onClose}
        className="w-full h-14 rounded-full bg-brand hover:bg-[#65a100] text-white text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
      >
        <span>{t("register_success.view_packages")}</span>
        <ArrowLeft size={22} strokeWidth={2.5} className="ltr:rotate-180" />
      </Button>

      {/* Download App Section */}
      <div className="w-full pt-4 space-y-6">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 ">
            <Smartphone size={24} />
            <span className="font-bold text-lg">
              {t("register_success.download_app")}
            </span>
          </div>
          <div className="h-[3px] w-8 bg-black" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center ">
          {/* Google Play */}
          <a
            href="#"
            className="flex-1 flex items-center gap-3 bg-gray-100 border border-[#E5E5E5] rounded-2xl px-6 py-2.5 shadow-sm transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto min-w-[180px]"
          >
            <FaGooglePlay className="text-3xl text-[#5F6368]" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] text-muted-foreground uppercase whitespace-nowrap">
                {t("register_success.download_on_the")}
              </span>
              <span className="text-lg font-bold text-[#5F6368] whitespace-nowrap">Google Play</span>
            </div>
          </a>

          {/* Apple Store */}
          <a
            href="#"
            className="flex-1 flex items-center gap-3 bg-black rounded-2xl px-6 py-2.5 shadow-sm transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto min-w-[180px]"
          >
            <FaApple className="text-3xl text-white" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] text-white/70 uppercase whitespace-nowrap">
                {t("register_success.download_on_the")}
              </span>
              <span className="text-lg font-bold text-white whitespace-nowrap">Apple Store</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
