import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/itemApi";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

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
  const [pageSize, setPageSize] = useState<number>(getPageSize());

  const { data, isLoading, error } = useQuery<ProductsResponse, Error>({
    queryKey: ["bestItems", pageSize],
    queryFn: () =>
      getProducts({ orderBy: "favorite", pageSize: pageSize.toString() }),
  });

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (error) return <div>오류가 발생했습니다: {(error as Error).message}</div>;
  return (
    <div className="bestItemsContainer">
      <h1 className="sectionTitle">베스트 상품</h1>
      <div className="bestItemsCardSection">
        {data?.list.map((item: Item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;
