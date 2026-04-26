"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@/i18n/navigation";
import { ChevronLeft, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { BookingItem } from "../types";
import BookingCard from "./booking-card";
import CustomPagination from "./pagination";
import { useState } from "react";

interface BookingListProps {
  inProgressBookings: BookingItem[];
  completedBookings: BookingItem[];
  pagination: {
    pending?: { total: number; per_page: number; current_page: number; last_page: number };
    completed?: { total: number; per_page: number; current_page: number; last_page: number };
  };
  onPageChange: (type: "pending" | "completed", page: number) => void;
}

export default function BookingList({ 
  inProgressBookings, 
  completedBookings, 
  pagination,
  onPageChange 
}: BookingListProps) {
  const t = useTranslations("MyBookings");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="bg-gray-900 text-white rounded-full hover:bg-brand size-10"
        >
          <ChevronLeft size={20} className="rtl:rotate-180" />
        </Button>
        <h2 className="text-xl font-black text-gray-400">{t("title")}</h2>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={(v) => setActiveTab(v as "pending" | "completed")} 
        className="w-full space-y-8"
      >
        <TabsList className="w-full bg-white p-1 rounded h-12! border border-gray-100 shadow-sm">
          <TabsTrigger
            value="pending"
            className="flex-1 h-full font-bold data-[state=active]:bg-[#90A1B9] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400"
          >
            {t("in_progress")}
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 h-full font-bold data-[state=active]:bg-[#90A1B9] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400"
          >
            {t("completed")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-0">
          {inProgressBookings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
              <CustomPagination 
                currentPage={pagination.pending?.current_page || 1}
                lastPage={pagination.pending?.last_page || 1}
                onPageChange={(page) => onPageChange("pending", page)}
              />
            </>
          ) : (
            <EmptyState message={t("no_pending")} />
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {completedBookings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
              <CustomPagination 
                currentPage={pagination.completed?.current_page || 1}
                lastPage={pagination.completed?.last_page || 1}
                onPageChange={(page) => onPageChange("completed", page)}
              />
            </>
          ) : (
            <EmptyState message={t("no_completed")} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  const t = useTranslations("MyBookings");
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 gap-4">
      <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-300">
        <Plus size={32} />
      </div>
      <p className="text-gray-400 font-bold">{message}</p>
      <Button 
        onClick={() => router.push("/#packages")}
        className="bg-brand text-black rounded-full font-bold px-8"
      >
        {t("book_new")}
      </Button>
    </div>
  );
}
