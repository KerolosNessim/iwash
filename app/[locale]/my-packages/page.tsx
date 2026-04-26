"use client";

import PackageList from "@/features/my-packages/components/package-list";
import { useMyPackages } from "@/features/my-packages/hooks/useMyPackages";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export default function MyPackagesPage() {
  const [activePage, setActivePage] = useState(1);
  const [finishedPage, setFinishedPage] = useState(1);

  const { 
    activePackages, 
    finishedPackages, 
    pagination,
    isLoading, 
    error 
  } = useMyPackages(activePage, finishedPage);

  const handlePageChange = (type: "active" | "finished", page: number) => {
    if (type === "active") {
      setActivePage(page);
    } else {
      setFinishedPage(page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading && activePage === 1 && finishedPage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <Spinner className="size-10 text-brand" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-40 pb-16 bg-gray-50/50">
      <div className="container">
        <PackageList 
          activePackages={activePackages} 
          finishedPackages={finishedPackages} 
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
