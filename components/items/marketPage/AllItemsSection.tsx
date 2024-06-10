import { useEffect, useState } from "react";
import { getProducts } from "@/api/itemApi";
import ItemCard from "./ItemCard";
import DropdownMenu from "@/components/ui/DropdownMenu";
import PaginationBar from "@/components/ui/PaginationBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "@/types/productTypes";
import { MarketSectionTitle } from "@/styles/MarketStyles";
import styled from "styled-components";
import { SectionHeader, StyledLink } from "@/styles/CommonStyles";
import useViewport from "@/hooks/useViewport";
import { useRouter } from "next/router";
import SearchBar from "@/components/ui/SearchBar";

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

const getPageSize = (width: number) => {
  if (width < 768) {
    return 4; // Mobile viewport
  } else if (width < 1280) {
    return 6; // Tablet viewport
  } else {
    return 10; // Desktop viewport
  }
};

const AllItemsSection: React.FC = () => {
  const [orderBy, setOrderBy] = useState<ProductSortOption>("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [itemList, setItemList] = useState<Product[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const viewportWidth = useViewport();

  useEffect(() => {
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  useEffect(() => {
    if (pageSize === null) return;

    const fetchSortedData = async () => {
      setIsLoading(true);
      try {
        const data: ProductListResponse = await getProducts({
          orderBy,
          page,
          pageSize,
        });
        setItemList(data.list);
        setTotalPageNum(Math.ceil(data.totalCount / pageSize));
      } catch (error) {
        console.error("오류: ", (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSortedData();
  }, [orderBy, page, pageSize]);

  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption);
  };

  const handleSearch = (searchKeyword: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: searchKeyword },
    });
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div>
        <SectionHeader>
          <MarketSectionTitle>판매 중인 상품</MarketSectionTitle>
          <AddItemLink href="/additem">상품 등록하기</AddItemLink>
        </SectionHeader>

        <SectionHeader>
          <SearchBar
            onSearch={handleSearch}
            placeholder="검색할 상품을 입력해 주세요"
          />
          <DropdownMenu
            onSortSelection={handleSortSelection}
            sortOptions={[
              { key: "recent", label: "최신순" },
              { key: "favorite", label: "인기순" },
            ]}
          />
        </SectionHeader>

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
