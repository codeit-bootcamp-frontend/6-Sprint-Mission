import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/itemApi";
import { Link } from "react-router-dom";

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

interface Product {
  images: string[];
  name: string;
  favoriteCount: number;
  price: number;
  id: number;
}

function BestItemsSection() {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const fetchSortedData = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: string;
    pageSize: number;
  }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
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
    <div className="bestItemsContainer">
      <h1 className="sectionTitle">베스트 상품</h1>

      <div className="bestItemsCardSection">
        {itemList?.map((item) => (
          <Link to={`/items/${item.id}`} key={`best-item-${item.id}`}>
            <ItemCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;
