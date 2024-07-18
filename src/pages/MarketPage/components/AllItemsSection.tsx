import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import { Link } from "react-router-dom";
import DropdownMenu from "../../../components/UI/DropdownMenu";
import PaginationBar from "../../../components/UI/PaginationBar";
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
  totalCount: number;
}

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

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(getPageSize());

  const { data, isLoading, error } = useQuery<ProductsResponse, Error>({
    queryKey: ["allItems", orderBy, page, pageSize],
    queryFn: () =>
      getProducts({
        orderBy,
        page: page.toString(),
        pageSize: pageSize.toString(),
      }),
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

  const handleSortSelection = (sortOption: string) => {
    setOrderBy(sortOption);
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;

  return (
    <div>
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle">판매 중인 상품</h1>
        <Link to="/additem" className="loginLink button">
          상품 등록하기
        </Link>
      </div>

      <div className="allItemsSectionHeader">
        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
          />
        </div>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </div>

      <div className="allItemsCardSection">
        {data?.list.map((item: Item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>

      {data && (
        <div className="paginationBarWrapper">
          <PaginationBar
            totalPageNum={Math.ceil(data.totalCount / pageSize)}
            activePageNum={page}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default AllItemsSection;
