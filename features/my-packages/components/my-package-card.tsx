"use client";

import { 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles,
  Timer,
  Car
} from "lucide-react";
import { MyPackageItem } from "../types";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface PackageCardProps {
  item: MyPackageItem;
}

export default function MyPackageCard({ item }: PackageCardProps) {
  const t = useTranslations("MyPackages");

  const isActive = item.status === "active" || item.status === "pending";
  
  // As per user: "the defult times is one"
  // Assuming 4 washes total for monthly packages
  const washesTotal = 4;
  const washesUsed = 1;

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 flex flex-col gap-6 group hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400 text-sm font-bold flex items-center gap-2">
          <span>{item.order_number || item.id}</span>
          <span className="size-1 bg-gray-200 rounded-full" />
          <span dir="ltr">{item.created_at.split(" ")[0]}</span>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded border text-xs font-bold ${
            isActive 
              ? "bg-yellow-50 text-black border-yellow-500" 
              : "bg-red-50 text-red-600 border-red-200"
          }`}
        >
          {isActive ? t("active_status") : t("finished_status")}
          {isActive && <Sparkles size={14} className="animate-pulse" />}
        </div>
      </div>

      {/* Package Info */}
      <div className="text-center space-y-2">
        <Sparkles
          size={24}
          className={`block mx-auto ${item.details.package.is_popular ? "text-yellow-500" : "text-brand"}`}
        />
        <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
          <h3>{item.details.package.name}</h3>
        </div>
        <p className="text-gray-400 text-sm font-bold">
          {t("washes_per_month", { count: washesTotal })}
        </p>

        <div className="flex items-center justify-center gap-1">
          <span className="text-brand font-black text-3xl">
            {item.price}
          </span>
          <span className="text-gray-500 font-bold text-xs">QR</span>
        </div>
      </div>

      {/* Progress Bar (Only for monthly) */}
      {item.booking_type === "monthly" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
            <span>{t("usage")}</span>
            <span>{t("washes_count", { used: washesUsed, total: washesTotal })}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
            {Array.from({ length: washesTotal }).map((_, i) => (
              <div 
                key={i}
                className={`flex-1 h-full rounded-full transition-colors ${
                  i < washesUsed ? "bg-brand" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Details List */}
      <div className="bg-[#F7F6F9] rounded-3xl p-4 space-y-3">
        <DetailItem 
          icon={<Car size={16} />} 
          label={useTranslations("MyBookings")("car_type")} 
          value={`${item.details.car.model.name} (${item.details.car.plate_number})`} 
        />
        <DetailItem 
          icon={<MapPin size={16} />} 
          label={t("area")} 
          value={item.details.area.name} 
        />
        <DetailItem 
          icon={<Calendar size={16} />} 
          label={t("subscription_date")} 
          value={item.booking_date} 
        />
        <DetailItem 
          icon={<Clock size={16} />} 
          label={t("time")} 
          value={item.booking_time.substring(0, 5)} 
        />
      </div>

      {/* Action Button (Commented out as per user) */}
      {/* <Button 
        className={`w-full rounded-full font-bold h-12 ${
          isActive ? "bg-brand text-black hover:bg-brand/90" : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {isActive ? t("request_wash") : t("renew")}
      </Button> */}
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-black/60">
        {icon}
        <span className="text-xs font-bold">{label}</span>
      </div>
      <span className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{value}</span>
    </div>
  );
}
