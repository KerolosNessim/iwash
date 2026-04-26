"use client";

import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomPaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({ currentPage, lastPage, onPageChange }: CustomPaginationProps) {
  if (lastPage <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    if (lastPage <= maxVisible) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", lastPage);
      } else if (currentPage >= lastPage - 2) {
        pages.push(1, "...", lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage);
      }
    }
    return pages;
  };

  return (
    <Pagination className="mt-12">
      <PaginationContent className="gap-2">
        {/* Next Button (Left side in RTL) */}
        <PaginationItem>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="size-10 flex items-center justify-center rounded-full bg-white border border-gray-50 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ChevronRight className="size-4" />
          </button>
        </PaginationItem>

        {getPages().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis className="size-10" />
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`size-10 flex items-center justify-center rounded-full font-bold transition-all ${
                  currentPage === page
                    ? "bg-brand text-white shadow-lg shadow-brand/30"
                    : "bg-white text-gray-500 border border-gray-50 shadow-sm hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )}
          </PaginationItem>
        ))}

        {/* Previous Button (Right side in RTL) */}
        <PaginationItem>
          <button
            onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
            className="size-10 flex items-center justify-center rounded-full bg-white border border-gray-50 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="size-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
