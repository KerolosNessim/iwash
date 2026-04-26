"use client";

import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { FaRegCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useState } from "react";
import { PiPaintBrushDuotone } from "react-icons/pi";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { Button } from "@base-ui/react";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { PackageItem } from "../types";
import { useTranslations } from "next-intl";
import BookingDialog from "@/features/booking/components/booking-dialog";

export default function PackageCard({ item }: { item: PackageItem }) {
  const t = useTranslations("Packages");
  const [switchVal, setSwitchVal] = useState(false);
  const [washType, setWashType] = useState<"external" | "both">("external");

  const isPopluar = item?.is_popular;

  return (
    <div
      className={`bg-white p-6 rounded-2xl h-full flex flex-col border-2 border-gray-200 gap-4 shadow-md ${isPopluar ? "border-yellow-500" : ""}`}
    >
      {/* image */}

      <Image
        src={item?.image || "/hero-2.png"}
        alt="Logo"
        width={200}
        height={200}
        className=" w-full h-60 object-cover rounded-xl"
      />
      {/* info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p
            className={`text-2xl font-bold ${isPopluar ? "text-yellow-500" : "text-black"}`}
          >
            {item?.name}
          </p>
          <div className="flex items-strat gap-1 text-gray-400 font-bold">
            <p>QR</p>
            <p className="text-3xl ">
              {!switchVal &&
                washType === "external" &&
                item?.pricing?.single?.external}
              {!switchVal &&
                washType === "both" &&
                item?.pricing?.single?.internal}
              {switchVal &&
                washType === "external" &&
                item?.pricing?.package?.external}
              {switchVal &&
                washType === "both" &&
                item?.pricing?.package?.internal}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt className="text-blue-500" />
          <p className="text-gray-400">{item?.duration}</p>
        </div>
      </div>
      {/* check */}
      <div
        className={` ${isPopluar ? "bg-yellow-400/20" : "bg-brand/10"} p-3 rounded-full  flex items-center justify-between transition-all border ${switchVal ? (isPopluar ? "border-yellow-400" : "border-brand") : "border-transparent"}`}
      >
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 font-bold">
            {t("subscription")} {item?.pricing?.monthly_washes_count}{" "}
            {t("per_month")}
          </p>
          <div
            className={` ${isPopluar ? "bg-yellow-400" : "bg-[#A5FF52]"} p-2 rounded-tr-2xl rounded-bl-2xl`}
          >
            <p className="text-sm  font-bold">
              {t("save")} {item?.pricing?.monthly_discount_text}%
            </p>
          </div>
        </div>
        <Switch
          checked={switchVal}
          onCheckedChange={setSwitchVal}
          dir="ltr"
          className={`bg-gray-300 ${isPopluar ? "data-[state=checked]:bg-yellow-400" : "data-[state=checked]:bg-brand"} transition-colors`}
        />
      </div>
      {/* paragraph */}
      <p className="flex items-center gap-2 text-sm font-bold">
        <PiPaintBrushDuotone size={20} />
        {t("choose")}
      </p>

      {/* Tabs */}
      <div className="flex  rounded-full p-1 gap-1">
        <button
          onClick={() => setWashType("external")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-bold transition-all text-sm ${
            washType === "external"
              ? "bg-black text-white"
              : "text-gray-600 bg-gray-200"
          }`}
        >
          {washType === "external" ? (
            <FaCheckCircle className="text-[#A5FF52]" size={16} />
          ) : (
            <BsBoxArrowInUpRight size={16} />
          )}

          {t("external")}
        </button>
        <button
          onClick={() => setWashType("both")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-bold transition-all text-sm ${
            washType === "both"
              ? "bg-black text-white"
              : "text-gray-600 bg-gray-200"
          }`}
        >
          {washType === "both" ? (
            <FaCheckCircle className="text-[#A5FF52]" size={16} />
          ) : (
            <BsBoxArrowInUpRight size={16} />
          )}
          {t("both")}
        </button>
      </div>

      {/* Features List */}
      <div className="space-y-4 pt-2">
        <p className="font-bold text-lg">{t("what_you_get")}</p>
        <ul className="space-y-3">
          {item?.features?.map((feature) => {
            const isIncluded =
              washType === "external" ? feature.is_external : feature.both;
            return (
              <li
                key={feature.id}
                className={`flex items-center gap-3  text-sm ${
                  isIncluded ? "text-black" : "text-gray-400"
                }`}
              >
                {isIncluded ? (
                  <FaCheckCircle className="text-[#65b719]" size={18} />
                ) : (
                  <FaTimesCircle className="text-red-500" size={18} />
                )}
                {feature.name}
              </li>
            );
          })}
        </ul>
      </div>
      <BookingDialog
        packageItem={item}
        washType={washType}
        isSubscription={switchVal}
      >
        <Button
          className={`mt-auto ${isPopluar ? "bg-yellow-400 hover:bg-yellow-400/90" : "bg-brand hover:bg-brand/90"}  cursor-pointer  px-8 h-12 rounded-full font-bold  transition-all w-fit mx-auto flex items-center justify-center gap-2`}
        >
          {t("request_now")}
          <TbArrowBigLeftLinesFilled className="ltr:-rotate-180" />
        </Button>
      </BookingDialog>
    </div>
  );
}
