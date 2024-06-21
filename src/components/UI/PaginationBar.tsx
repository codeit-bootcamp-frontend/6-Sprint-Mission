import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/arrow_right.svg";

const PaginationBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

// disabled는 버튼 태그의 고유 attribute이기 때문에 따로 타이핑하지 않아도 돼요.
const PaginationButton = styled.button<{ $isActive?: boolean }>`
  border: 1px solid var(--gray-200);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: ${({ $isActive }) => ($isActive ? "#fff" : "var(--gray-500)")};
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--blue)" : "transparent"};
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

interface PaginationBarProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPageNum,
  activePageNum,
  onPageChange,
}) => {
  const maxVisiblePages = 5;
  let startPage: number;

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
    <PaginationBarContainer>
      <PaginationButton
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <LeftArrow />
      </PaginationButton>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          $isActive={activePageNum === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}
      <PaginationButton
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <RightArrow />
      </PaginationButton>
    </PaginationBarContainer>
  );
};

export default PaginationBar;
