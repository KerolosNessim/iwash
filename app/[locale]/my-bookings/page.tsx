"use client";

import BookingList from "@/features/my-bookings/components/booking-list";
import { useBookings } from "@/features/my-bookings/hooks/useBookings";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function MyBookingsPage() {
  const t = useTranslations("MyBookings");
  const [pendingPage, setPendingPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);

  const { 
    inProgressBookings, 
    completedBookings, 
    pagination,
    isLoading, 
    error 
  } = useBookings(pendingPage, completedPage);

  const handlePageChange = (type: "pending" | "completed", page: number) => {
    if (type === "pending") {
      setPendingPage(page);
    } else {
      setCompletedPage(page);
    }
    // Scroll to top of list area
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading && pendingPage === 1 && completedPage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <Spinner className="size-10 text-brand" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-40 pb-16">
      <div className="container">
        <BookingList 
          inProgressBookings={inProgressBookings} 
          completedBookings={completedBookings} 
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
