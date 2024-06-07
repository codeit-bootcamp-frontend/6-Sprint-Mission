import "./PaginationBar.css";
import LeftArrow from "@/assets/images/icons/arrow_left.svg";
import RightArrow from "@/assets/images/icons/arrow_right.svg";

type PaginationBarProps = {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationBar = ({
  totalPageNum,
  activePageNum,
  onPageChange
}: PaginationBarProps) => {
  const maxVisiblePages = 5;
  let startPage;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="paginationBar">
      <button
        className="paginationButton"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <img src={LeftArrow} alt="왼쪽 화살표" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`paginationButton ${
            activePageNum === page ? "active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="paginationButton"
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <img src={RightArrow} alt="오른쪽 화살표" />
      </button>
    </div>
  );
};

export default PaginationBar;
