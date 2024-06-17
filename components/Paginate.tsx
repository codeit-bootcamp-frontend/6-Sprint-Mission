import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.scss";

type PaginateProps = {
  totalCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Paginate: React.FC<PaginateProps> = ({
  totalCount,
  currentPage,
  setCurrentPage,
}) => {
  const recordPerPage = 10;
  const totalPage = Math.ceil(totalCount / recordPerPage);
  const totalPageArr = Array.from({ length: totalPage }, (_, i) => i + 1);

  const onClickPageNumber = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className={styles.pagination_area}>
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={() => {
          setCurrentPage((prev) => prev - 1);
        }}
      >
        prev
      </button>
      <ul>
        {totalPageArr.map((pageNum, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                onClickPageNumber(pageNum);
              }}
            >
              {pageNum}
            </li>
          );
        })}
      </ul>
      <button
        disabled={currentPage === totalPage ? true : false}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Paginate;
