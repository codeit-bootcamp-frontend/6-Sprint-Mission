"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import SortDropdown from "@/components/Dropdown/SortDropdown";
import Input from "@/components/Input/Input";
import Pagination from "@/components/Pagination";
import ItemCard from "@/components/Item/ItemCard";
import useDeviceSize from "@/hooks/useDeviceSize";
import usePagination from "@/hooks/usePagination";
import { ITEM_LIMIT } from "@/constants/pageLimit";
import { ITEM_SORT_OPTIONS, ItemSortOptionsKeys } from "@/types/SortOptions";
import { getProducts } from "@/lib/api/product";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import EmptyItem from "./EmptyItem";

const INITIAL_ITEM_PARAMS = {
  pageSize: ITEM_LIMIT["large"],
  order: "recent" as ItemSortOptionsKeys,
};

interface NormalItemListProps {
  className?: string;
  searchParams: {
    page?: number;
    keyword?: string;
    order?: ItemSortOptionsKeys;
  };
}

const NormalItemList = ({
  className = "",
  searchParams,
}: NormalItemListProps) => {
  const page = searchParams.page || 1;
  const keyword = searchParams.keyword || "";
  const order = searchParams.order || INITIAL_ITEM_PARAMS.order;
  const limit = INITIAL_ITEM_PARAMS.pageSize;

  const {
    data,
    isLoading: itemsLoading,
    error: itemsError,
  } = useQuery({
    queryKey: ["products", page, keyword, order],
    queryFn: () => getProducts({ page, limit, keyword, order }),
    placeholderData: keepPreviousData,
  });

  const { totalCount, list } = data ?? { totalCount: 0, list: [] };
  const deviceSize = useDeviceSize();
  const router = useRouter();

  const {
    currentPageNumber,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = usePagination(totalCount, ITEM_LIMIT[deviceSize]);

  const handleSearch = (query: string) => {
    router.replace(`/items?keyword=${query}`);
  };

  const handleOrder = (order: ItemSortOptionsKeys) => {
    router.replace(`/items?order=${order}`);
  };

  const slicedItems = list.slice(0, ITEM_LIMIT[deviceSize]);

  if (itemsLoading) return <div>Loading...</div>;
  if (itemsError) return <div>Error loading data</div>;

  return (
    <>
      <div className="mb-16 grid grid-cols-itemsHeader gap-8 grid-areas-itemsHeader md:flex md:items-center">
        <h2 className="my-auto mr-auto shrink-0 text-20 font-bold text-cool-gray-800 grid-in-title">
          판매중인 상품
        </h2>
        <Input.Search
          placeholder="검색할 상품을 입력해주세요"
          defaultValue={keyword ? keyword : ""}
          onKeyDown={handleSearch}
          className="w-full grid-in-searchBar md:w-242"
        />
        <Button.Link
          className="ct--primary-button h-42 w-133 shrink-0 grid-in-addButton"
          href="/additem"
        >
          상품 등록하기
        </Button.Link>
        <SortDropdown
          order={order ? order : "recent"}
          onClick={handleOrder}
          options={ITEM_SORT_OPTIONS}
          className="mx-auto grid-in-sortOption md:m-0"
        />
      </div>

      <div className={`${className}`}>
        {list && list.length !== 0 ? (
          <>
            <div className="flex flex-wrap justify-between gap-4">
              {slicedItems.map((item: Item) => (
                <ItemCard
                  key={item.id}
                  data={item}
                  className={`w-[calc(50%-4px)] shrink-0 md:w-[calc(33.3%-12px)] xl:w-[calc(20%-19.2px)] `}
                />
              ))}
            </div>
            <Pagination
              className="py-40"
              currentPage={currentPageNumber}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              goToPage={goToPage}
            />
          </>
        ) : (
          <EmptyItem />
        )}
      </div>
    </>
  );
};

export default NormalItemList;
