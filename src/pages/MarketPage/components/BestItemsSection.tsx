import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/itemApi";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

interface Item {
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
  images: string[];
}

interface ProductsResponse {
  list: Item[];
}

const getPageSize = (): number => {
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

function BestItemsSection() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<number>(getPageSize());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSortedData = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: string;
    pageSize: number;
  }) => {
    setIsLoading(true);
    try {
      const products: ProductsResponse = await getProducts({
        orderBy,
        pageSize: pageSize.toString(),
      });
      setItemList(products.list);
    } catch (error) {
      console.error("오류: ", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div className="bestItemsContainer">
        <h1 className="sectionTitle">베스트 상품</h1>

        <div className="bestItemsCardSection">
          {itemList?.map((item) => (
            <ItemCard item={item} key={`best-item-${item.id}`} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BestItemsSection;
