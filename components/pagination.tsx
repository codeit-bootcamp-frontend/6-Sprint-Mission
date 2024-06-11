import { Dispatch, SetStateAction } from 'react';
import { constants } from '../lib/constants';

type Props = {
  totalCount: number;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
};

export default function Pagination({ pageNum, setPageNum, totalCount }: Props) {
  const totalPage = Math.ceil(totalCount / constants.PAGE_SIZE);
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

  return (
    <div className='flex items-center justify-center gap-1 my-10'>
      <button
        onClick={handlePrevious}
        disabled={pageNum === 1}
        className='bg-white border border-gray-200 rounded-[50%] min-w-9 min-h-9 active:border-0 active:text-white active:bg-blue-500'>
        &lt;
      </button>
      <div className='flex justify-center'>
        {Array.from({ length: lastPage - startPage + 1 }, (_, i) => startPage + i).map(pageIndex => (
          <button
            key={pageIndex}
            onClick={() => handlePage(pageIndex)}
            className={`min-w-9 min-h-9 mx-1 rounded-full border ${
              pageNum === pageIndex
                ? 'bg-blue-500 text-white'
                : 'bg-white border-gray-200 active:border-0 active:text-white active:bg-blue-500'
            }`}>
            {pageIndex}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={pageNum === totalPage}
        className='rounded-[50%] min-w-9 min-h-9 bg-white border border-gray-200 active:border-0 active:text-white active:bg-blue-500'>
        &gt;
      </button>
    </div>
  );
}
