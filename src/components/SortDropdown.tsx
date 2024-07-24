import paginationStore from '../store/paginationStore';

export default function SortDropdown({
  setSortContent,
  setOrderBy,
  sortOptions,
}: {
  setSortContent: React.Dispatch<React.SetStateAction<string>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  sortOptions: {
    LIKE: string;
    NEWEST: string;
  };
}) {
  // 최신순, 좋아요순으로 바꿀 시 페이지를 1페이지로 이동시키기 위한 setter입니다.
  const setCurrentPage = paginationStore((state) => state.setCurrentPage);

  // props를 받아 구현하였습니다.
  const handleSort = (
    sortContentValue: React.SetStateAction<string>,
    orderBy: string,
  ) => {
    setSortContent(sortContentValue);
    setOrderBy(orderBy);
    setCurrentPage(1);
  };

  const handleDateSort = () => {
    handleSort(sortOptions.NEWEST, 'recent');
  };

  const handleLikeSort = () => {
    handleSort(sortOptions.LIKE, 'favorite');
  };

  return (
    <ul className="absolute right-1 top-12 w-32 rounded-xl border bg-white text-center sm:-left-[105px] sm:top-10">
      <li className="cursor-pointer border-b py-2" onClick={handleDateSort}>
        최신순
      </li>
      <li className="cursor-pointer py-2" onClick={handleLikeSort}>
        좋아요순
      </li>
    </ul>
  );
}
