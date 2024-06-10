import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "@/api/itemApi";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Product, ProductListResponse } from "@/types/productTypes";
import styled from "styled-components";
import { MarketSectionTitle } from "@/styles/MarketStyles";
import useViewport from "@/hooks/useViewport";

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

const getPageSize = (width: number) => {
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
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          orderBy: "favorite",
          pageSize,
        });
        setItemList(data.list);
      } catch (error) {
        console.error("오류: ", (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSortedData();
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
