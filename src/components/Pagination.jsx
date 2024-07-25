import React from "react";
import leftArrow from "../imgs/icon/icon_arrow_left.svg";
import rightArrow from "../imgs/icon/icon_arrow_right.svg";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageButtons = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`h-[45px] w-[45px] rounded-[40px] border focus:text-[--gray50] focus:bg-[--blue60] hover:bg-[--gray200] ${
          currentPage === i ? "font-[700] text-[--gray50] bg-[--blue60]" : ""
        }`}
        type="button"
      >
        {i}
      </button>
    );
  }

  return (
    <div className="mt-4 flex justify-center gap-3">
      <div className="relative h-[45px] w-[45px]">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="h-[45px] w-[45px] rounded-[40px] text-gray-400 border hover:bg-[--gray200]"
          type="button"
        >
          <div className="absolute left-2 top-3">
            <img
              src={leftArrow}
              alt="이전 화살표"
              width={24}
              height={24}
              style={{ width: "24px", height: "24px" }}
              draggable="false"
            />
          </div>
        </button>
      </div>
      {pageButtons}
      <div className="relative h-[45px] w-[45px]">
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="h-[45px] w-[45px] rounded-[40px] text-gray-400 border hover:bg-[--gray200]"
          type="button"
        >
          <div className="absolute right-2 top-3">
            <img
              src={rightArrow}
              alt="다음 화살표"
              width={24}
              height={24}
              style={{ width: "24px", height: "24px" }}
              draggable="false"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
