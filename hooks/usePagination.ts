import { Dispatch, SetStateAction } from 'react';

export default function usePagination(
  pageNum: number,
  setPageNum: Dispatch<SetStateAction<number>>,
  totalCount: number,
  pageSize: number
) {
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageGroup = Math.ceil(pageNum / 5);
  const startPage = (pageGroup - 1) * 5 + 1;
  let lastPage = pageGroup * 5;
  if (lastPage > totalPage) lastPage = totalPage;

  const handlePrevious = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum < totalPage) {
      setPageNum(pageNum + 1);
    }
  };

  const handlePage = (pageIndex: number) => {
    setPageNum(pageIndex);
  };

  return { totalPage, startPage, lastPage, handlePrevious, handleNext, handlePage };
}
