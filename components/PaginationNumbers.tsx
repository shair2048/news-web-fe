"use client";

import { Button } from "@/components/ui/button";
import { PaginationEllipsis, PaginationItem } from "./ui/pagination";

interface PaginationNumbersProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export default function PaginationNumbers({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: PaginationNumbersProps) {
  const generatePagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "ellipsis", totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "ellipsis", ...rightRange];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = generatePagination();

  return (
    <>
      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        return (
          <PaginationItem key={page}>
            <Button
              variant={page === currentPage ? "default" : "ghost"}
              size="icon"
              className="cursor-pointer"
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          </PaginationItem>
        );
      })}
    </>
  );
}
