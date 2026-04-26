"use client";

import {
  Calendar,
  Car,
  CheckCircle,
  Clock,
  MapPin,
  Sparkles,
  XCircle
} from "lucide-react";
import { useTranslations } from "next-intl";
import { BookingItem } from "../types";

interface BookingCardProps {
  booking: BookingItem;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const t = useTranslations("MyBookings");

  const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: {
      label: t("pending_status"),
      color: "bg-yellow-50 text-black border-yellow-500",
      icon: <Sparkles size={14} className="animate-pulse" />
    },
    completed: {
      label: t("completed_status"),
      color: "bg-green-50 text-green-600 border-green-600",
      icon: <CheckCircle size={14} />
    }
  };

  const currentStatus = statusConfig[booking.status] || {
    label: booking.localized_status,
    color: "bg-gray-50 text-gray-600 border-gray-100",
    icon: <Clock size={14} />
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 flex flex-col gap-6 group hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400 text-sm font-bold flex items-center gap-2">
          <span>{booking?.order_number || booking?.id}</span>
          <span className="size-1 bg-gray-200 rounded-full" />
          <span dir="ltr">{booking?.created_at.split(" ")[0]}</span>
        </div>
        <div
          className={`flex items-center gap-2 p-2 rounded border text-sm font-bold ${currentStatus.color}`}
        >
          {currentStatus.label}
          {currentStatus.icon}
        </div>
      </div>

      {/* Package Info */}
      <div className="text-center space-y-2 ">
        <Sparkles
          size={24}
          className={` block mx-auto ${booking?.details?.package?.is_popular ? "text-yellow-500" : "text-brand"}`}
        />
        <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
          <h3>{booking.details.package.name}</h3>
        </div>

        <div className="flex items-center justify-center gap-1 ">
          <span className="text-brand font-black text-3xl">
            {booking.price}
          </span>
          <span className="text-gray-500 font-bold text-xs">QR</span>
        </div>
      </div>

      {/* Details List */}
      <div className="bg-[#F7F6F9] rounded-3xl p-4 space-y-3">
        <DetailItem
          icon={<Car size={16} />}
          label={t("car_type")}
          value={`${booking.details.car.model.name} (${booking.details.car.plate_number})`}
        />
        <DetailItem
          icon={<MapPin size={16} />}
          label={t("location")}
          value={booking.details.area.name}
        />
        <DetailItem
          icon={<Calendar size={16} />}
          label={t("date")}
          value={booking.booking_date}
        />
        <DetailItem
          icon={<Clock size={16} />}
          label={t("time")}
          value={booking.booking_time.substring(0, 5)}
        />
      </div>
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
