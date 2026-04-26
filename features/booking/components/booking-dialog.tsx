import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";

import { PackageItem } from "@/features/home/types";
import BookingForm from "./booking-form";

interface BookingDialogProps {
  children: React.ReactNode;
  packageItem: PackageItem;
  washType: "external" | "both";
  isSubscription: boolean;
}

export default function BookingDialog({
  children,
  packageItem,
  washType,
  isSubscription,
}: BookingDialogProps) {
  const t = useTranslations("booking");
  const tPackages = useTranslations("Packages");

  const price = isSubscription
    ? washType === "external"
      ? packageItem.pricing.package.external
      : packageItem.pricing.package.internal
    : washType === "external"
      ? packageItem.pricing.single.external
      : packageItem.pricing.single.internal;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="lg:p-8 rounded-[3rem] border-none lg:max-w-[70%] max-h-[95vh] overflow-y-auto scrollbar-hide"
      >
        <DialogHeader>
          <DialogTitle className="pb-4 border-b flex items-center justify-between">
            <p className="text-lg font-semibold">{t("title")}</p>
            <DialogClose>
              <Button variant={"ghost"} size={"icon"}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="hidden">
            {t("summary", {
              package: packageItem.name,
              type: washType === "external" ? t("external") : t("both"),
              mode: isSubscription ? t("subscription") : t("single"),
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center  gap-2">
          <FaStar className="text-black " />
          <h2 className="text-xl font-bold text-black">{packageItem.name}</h2>
          <div className="flex items-center gap-4 ">
            {isSubscription && (
              <>
                <p className="text-gray-400 font-semibold ">
                  {packageItem.pricing.monthly_washes_count}{" "}
                  {tPackages("per_month")}
                </p>
                <div
                  className={`${packageItem?.is_popular ? "bg-yellow-500 text-black" : "bg-brand text-white"}   p-2 rounded-tr-2xl rounded-bl-2xl   font-bold text-xs shadow-sm `}
                >
                  {tPackages("save")}{" "}
                  {packageItem.pricing.monthly_discount_text}%
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400 ">
            <span className="text-4xl font-medium tracking-tighter">
              {price}
            </span>
            <span className=" font-bold">QR</span>
          </div>
        </div>


          <BookingForm 
            packageItem={packageItem}
            washType={washType}
            isSubscription={isSubscription}
          />
      </DialogContent>
    </Dialog>
  );
}
