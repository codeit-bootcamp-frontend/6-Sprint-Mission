/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;
interface PaginationResult {
  page: number;
  setPage: (page: number) => void;
  pageNumbers: number[];
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleClickPageNum: (number: number) => void;
}

function usePagination<T>(
  initialPage = 1,
  totalCount: number,
  pageSize: number,
  asyncFunction: AsyncFunction<T>,
): PaginationResult {
  const [page, setPage] = useState(initialPage);
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleClickPageNum = (number: number) => {
    if (number !== page) {
      setPage(number);
    }
  };

  useEffect(() => {
    asyncFunction(page);
  }, [page]);

  return {
    page,
    pageNumbers,
    handleNextPage,
    handlePrevPage,
    handleClickPageNum,
    setPage,
  };
}

export default usePagination;
