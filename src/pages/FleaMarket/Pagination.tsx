import styled from "styled-components";
import leftButton from "../../assets/btnLeft.svg";
import rightButton from "../../assets/btnRight.svg";

interface PaginationProps {
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleClickPageNum: (number: number) => void;
  pageNumbers: number[];
}

function Pagination({
  page,
  handlePrevPage,
  handleNextPage,
  handleClickPageNum,
  pageNumbers,
}: PaginationProps) {
  return (
    <PaginationIconContainer>
      <ButtonIcon>
        <img src={leftButton} alt="왼쪽 버튼" onClick={handlePrevPage} />
      </ButtonIcon>
      {pageNumbers.map((number) => (
        <NumberContainer
          key={number}
          $isActive={number === page}
          onClick={() => handleClickPageNum(number)}
        >
          <Number $isActive={number === page}>{number}</Number>
        </NumberContainer>
      ))}
      <ButtonIcon type="button" onClick={handleNextPage}>
        <img src={rightButton} alt="오른쪽 버튼" />
      </ButtonIcon>
    </PaginationIconContainer>
  );
}

const PaginationIconContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const ButtonIcon = styled.button`
  background: none;
`;

const NumberContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid
    ${({ $isActive }) => ($isActive ? "var(--main-color)" : "#E5E7EB")};
  padding: 12.5px;
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--main-color)" : "white"};
`;

const Number = styled.p<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "white" : "#E5E7EB")};
`;

export default Pagination;
