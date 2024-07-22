"use client";

import ItemCard from "@/components/Item/ItemCard";
import useDeviceSize from "@/hooks/useDeviceSize";
import { BEST_ITEM_LIMIT } from "@/constants/pageLimit";
import { getBestProducts } from "@/lib/api/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import EmptyItem from "./EmptyItem";

interface BestItemListProps {
  className?: string;
}

const BestItemList = ({ className = "" }: BestItemListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: getBestProducts,
    placeholderData: keepPreviousData,
  });

  const bestItems = data?.list ?? [];

  const deviceSize = useDeviceSize();
  const slicedItems = bestItems.slice(0, BEST_ITEM_LIMIT[deviceSize]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className={`${className}`}>
      <div className="text-20 font-bold text-cool-gray-800">베스트 상품</div>
      <div>
        {bestItems && bestItems.length !== 0 ? (
          <div className="flex justify-between gap-8">
            {slicedItems.map((item: Item) => (
              <ItemCard key={item.id} data={item} className={`w-full`} />
            ))}
          </div>
        ) : (
          <EmptyItem />
        )}
      </div>
    </div>
  );
};

export default BestItemList;
