import React from "react";
import styles from "./Pagination.module.css";
import arrowLeftIcon from "../assets/ic_arrow_left.svg";
import arrowRightIcon from "../assets/ic_arrow_right.svg";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.button}  ${
          currentPage === 1 ? styles.disabled : styles.inactive
        }`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <img src={arrowLeftIcon} alt="왼쪽 화살표 아이콘" />
      </button>

      {pages.map((page) => (
        <button
          className={`${styles.button} ${
            page === currentPage ? styles.active : styles.inactive
          }`}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`${styles.button}  ${
          currentPage === totalPages ? styles.disabled : styles.inactive
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <img src={arrowRightIcon} alt="오른쪽 화살표 아이콘" />
      </button>
    </div>
  );
}

export default Pagination;
