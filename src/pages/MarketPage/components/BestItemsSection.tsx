import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/itemApi";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "../../../types/productTypes";
import styled from "styled-components";
import { MarketSectionTitle } from "../MarketStyles";

const BestItemsContainer = styled.div`
  padding-top: 17px;
  padding-bottom: 24px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-bottom: 40px;
  }
`;

const BestItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 1;
  } else if (width < 1280) {
    // Tablet viewport
    return 2;
  } else {
    // Desktop viewport
    return 4;
  }
};

const BestItemsSection: React.FC = () => {
  // < 상태의 타입을 명시해줘야 하는 경우 >
  // - 타입스크립트는 useState 훅의 초기값을 기반으로 상태의 타입을 추론합니다.
  // - 하지만 초기값이 빈 배열일 때는 타입스크립트는 배열 내 요소의 타입을 추론할 수 없기 때문에 never[]로 간주합니다. 이로 인해 나중에 해당 상태를 업데이트하려고 하면 타입 불일치 오류가 발생합니다.
  // - 상태가 특정 타입의 배열임을 명시적으로 지정하면 타입스크립트는 해당 타입의 값만 허용하게 됩니다. (useState<> 내에 타입 작성)
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: ProductSortOption;
    pageSize: number;
  }) => {
    setIsLoading(true);
    try {
      const response: ProductListResponse = await getProducts({
        orderBy,
        pageSize,
      });
      setItemList(response.list);
    } catch (error) {
      // 타입스크립트가 error의 정확한 타입을 추론할 수 없기 때문에 명시적으로 Error 타입으로 typecasting 해 주세요.
      console.error("오류: ", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "favorite", pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <BestItemsContainer>
        <MarketSectionTitle>베스트 상품</MarketSectionTitle>

        <BestItemsCardSection>
          {itemList?.map((item) => (
            <ItemCard item={item} key={`best-item-${item.id}`} />
          ))}
        </BestItemsCardSection>
      </BestItemsContainer>
    </>
  );
};

export default BestItemsSection;
