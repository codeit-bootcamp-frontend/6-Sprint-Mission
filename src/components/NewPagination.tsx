import React, { useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {"<"}
      </button>
      {pages.length > 0 &&
        pages.map((i) => (
          <div
            key={i}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 font-bold ${
              currentPage === i ? "bg-btn-1 text-white" : ""
            } hover:bg-btn-1 hover:text-white`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </div>
        ))}
      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
}
