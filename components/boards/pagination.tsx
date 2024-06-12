import React from "react";
import arrow_left from "@/public/icon/Arrow-left.svg";
import arrow_right from "@/public/icon/Arrow-right.svg";
import arrow_left_gray from "@/public/icon/Arrow-left-gray.svg";
import arrow_right_gray from "@/public/icon/Arrow-right-gray.svg";
import Image from "next/image";
import styles from "@/styles/pagination.module.css";

const ELLIPSIS = "···";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.pageBtn} ${
            currentPage === i ? styles.active : ""
          }`}
        >
          {i}
        </div>
      );
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={`${styles.pageBtn} ${
              currentPage === i ? styles.active : ""
            }`}
          >
            {i}
          </div>
        );
      }
      pageNumbers.push(
        <div key="ellipsis1" className={`${styles.pageBtn} ${styles.ellipsis}`}>
          {ELLIPSIS}
        </div>
      );
      pageNumbers.push(
        <div
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`${styles.pageBtn} ${
            currentPage === totalPages ? styles.active : ""
          }`}
        >
          {totalPages}
        </div>
      );
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(
        <div
          key={1}
          onClick={() => onPageChange(1)}
          className={`${styles.pageBtn} ${
            currentPage === 1 ? styles.active : ""
          }`}
        >
          {1}
        </div>
      );
      pageNumbers.push(
        <div key="ellipsis1" className={`${styles.pageBtn} ${styles.ellipsis}`}>
          {ELLIPSIS}
        </div>
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={`${styles.pageBtn} ${
              currentPage === i ? styles.active : ""
            }`}
          >
            {i}
          </div>
        );
      }
    } else {
      pageNumbers.push(
        <div
          key={1}
          onClick={() => onPageChange(1)}
          className={`${styles.pageBtn} ${
            currentPage === 1 ? styles.active : ""
          }`}
        >
          {1}
        </div>
      );
      pageNumbers.push(
        <div key="ellipsis1" className={`${styles.pageBtn} ${styles.ellipsis}`}>
          {ELLIPSIS}
        </div>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={`${styles.pageBtn} ${
              currentPage === i ? styles.active : ""
            }`}
          >
            {i}
          </div>
        );
      }
      pageNumbers.push(
        <div key="ellipsis2" className={`${styles.pageBtn} ${styles.ellipsis}`}>
          {ELLIPSIS}
        </div>
      );
      pageNumbers.push(
        <div
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`${styles.pageBtn} ${
            currentPage === totalPages ? styles.active : ""
          }`}
        >
          {totalPages}
        </div>
      );
    }
  }

  return (
    <div className={styles.pagination}>
      <Image
        width={40}
        height={40}
        src={currentPage === 1 ? arrow_left_gray : arrow_left}
        className={`${styles.pageBtn} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        alt="arrow_left"
      />
      {pageNumbers}
      <Image
        width={40}
        height={40}
        src={currentPage === totalPages ? arrow_right_gray : arrow_right}
        className={`${styles.pageBtn} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        alt="arrow_right"
      />
    </div>
  );
}
