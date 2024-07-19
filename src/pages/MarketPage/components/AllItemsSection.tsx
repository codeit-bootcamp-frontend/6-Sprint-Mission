import { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg"; // tsconfig.json 및 declarations.d.ts 파일 참고
import DropdownMenu from "../../../components/UI/DropdownMenu";
import PaginationBar from "../../../components/UI/PaginationBar";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "../../../types/productTypes";
import { MarketSectionTitle } from "../MarketStyles";
import styled from "styled-components";
import { StyledLink } from "../../../styles/CommonStyles";

const AllItemsSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    padding-bottom: 8px;
  }

  &:nth-child(2) {
    padding-bottom: 16px;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  background-color: var(--gray-100);
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
  align-items: center;
`;

const SearchBarInput = styled.input`
  border: none;
  flex: 1;
  background-color: inherit;
  margin-left: 4px;

  &::placeholder {
    color: var(--gray-400);
    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;

const AddItemLink = styled(StyledLink)``;

const AllItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 8px;

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 40px 24px;
  }
`;

const PaginationBarWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
`;

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 4;
  } else if (width < 1280) {
    // Tablet viewport
    return 6;
  } else {
    // Desktop viewport
    return 10;
  }
};

const AllItemsSection: React.FC = () => {
  const [orderBy, setOrderBy] = useState<ProductSortOption>("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  // < 상태의 타입을 명시해줘야 하는 경우 >
  // - 타입스크립트는 useState 훅의 초기값을 기반으로 상태의 타입을 추론합니다.
  // - 하지만 초기값이 빈 배열일 때는 타입스크립트는 배열 내 요소의 타입을 추론할 수 없기 때문에 never[]로 간주합니다. 이로 인해 나중에 해당 상태를 업데이트하려고 하면 타입 불일치 오류가 발생합니다.
  // - 상태가 특정 타입의 배열임을 명시적으로 지정하면 타입스크립트는 해당 타입의 값만 허용하게 됩니다. (useState<> 내에 타입 작성)
  const [itemList, setItemList] = useState<Product[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({
    orderBy,
    page,
    pageSize,
  }: {
    orderBy: ProductSortOption;
    page: number;
    pageSize: number;
  }) => {
    setIsLoading(true);
    try {
      const response: ProductListResponse = await getProducts({
        orderBy,
        page,
        pageSize,
      });
      setItemList(response.list);
      setTotalPageNum(Math.ceil(response.totalCount / pageSize));
    } catch (error) {
      // 타입스크립트가 error의 정확한 타입을 추론할 수 없기 때문에 명시적으로 Error 타입으로 typecasting 해 주세요.
      console.error("오류: ", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div>
        <AllItemsSectionHeader>
          <MarketSectionTitle>판매 중인 상품</MarketSectionTitle>
          <AddItemLink to="/additem">상품 등록하기</AddItemLink>
        </AllItemsSectionHeader>

        <AllItemsSectionHeader>
          <SearchBarWrapper>
            <SearchIcon />
            <SearchBarInput placeholder="검색할 상품을 입력해 주세요" />
          </SearchBarWrapper>
          <DropdownMenu onSortSelection={handleSortSelection} />
        </AllItemsSectionHeader>

        <AllItemsCardSection>
          {itemList?.map((item) => (
            <ItemCard item={item} key={`market-item-${item.id}`} />
          ))}
        </AllItemsCardSection>

        <PaginationBarWrapper>
          <PaginationBar
            totalPageNum={totalPageNum}
            activePageNum={page}
            onPageChange={onPageChange}
          />
        </PaginationBarWrapper>
      </div>
    </>
  );
};

export default AllItemsSection;
