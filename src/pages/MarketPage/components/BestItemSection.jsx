import React, { useEffect, useState } from "react";
import { getProduct } from "../../../api/api";
import ItemCard from "./ItemCard";
//베스트 상품

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 400) {
    return 1;
  } else if (width < 800) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

function BestItemSection() {
  const pageFromStorage = Number(sessionStorage.getItem("page")) || 1;
  const [order, setOrder] = useState("favorite");
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(pageFromStorage);
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    sessionStorage.setItem("page", page);

    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("favorite", handleResize);

    const fetchDate = async () => {
      const products = await getProduct({ order, page, pageSize });
      setItem(products.list);
    };
    fetchDate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [order, page, pageSize]);

  return (
    <div className="m-auto sm:min-w-[320px] md:min-w-[344px] lg:min-w-[500px] xl:min-w-[600px] max-w-[1200px]">
      <h1 className="text-[20px] font-[700] mb-[16px] mt-[24px]">
        베스트 상품
      </h1>
      <div className="grid gap-[24px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {item?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemSection;
