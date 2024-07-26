import { ReactNode, useEffect } from "react";
import {
  useCurrentPageState,
  useTotalPages,
} from "contexts/react-context/FleaMarket";
import useDeviceState from "hooks/useDeviceState";
import ArrowLeft from "assets/icon/ic_arrow_left.svg";
import ArrowRight from "assets/icon/ic_arrow_right.svg";
import * as S from "./Pagination.style";

interface PageButtonProps {
  children: ReactNode;
  isFocus?: boolean;
  onClick: () => void;
}

function PageButton({ children, isFocus, onClick }: PageButtonProps) {
  return (
    <S.PageButton $isFocus={isFocus} onClick={onClick}>
      {children}
    </S.PageButton>
  );
}

export default function Pagination() {
  const [currentPage, setCurrentPage] = useCurrentPageState();
  const totalPages = useTotalPages();
  const { deviceState } = useDeviceState();

  const handleButtonClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleLeftClick = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev: number) => prev - 1);
  };

  const handleRightClick = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev: number) => prev + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [deviceState]);

  return (
    <S.PaginationContainer>
      <PageButton onClick={handleLeftClick}>
        <img src={ArrowLeft} alt="left-arrow" />
      </PageButton>
      {new Array(totalPages).fill(null).map((_, idx) => (
        <PageButton
          key={idx}
          isFocus={idx + 1 === currentPage}
          onClick={() => handleButtonClick(idx + 1)}
        >
          {idx + 1}
        </PageButton>
      ))}
      <PageButton onClick={handleRightClick}>
        <img src={ArrowRight} alt="right-arrow" />
      </PageButton>
    </S.PaginationContainer>
  );
}
