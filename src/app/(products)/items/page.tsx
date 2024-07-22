"use client";

import {
  BestItemList,
  NormalItemList,
} from "@/components/PageComponents/items";
import { ItemSortOptionsKeys } from "@/types/SortOptions";

interface ItemsProps {
  searchParams: {
    page?: number;
    keyword?: string;
    order?: ItemSortOptionsKeys;
  };
}

const Items = async ({ searchParams }: ItemsProps) => {
  return (
    <>
      <BestItemList className="mb-40 mt-100" />
      <NormalItemList searchParams={searchParams} />
    </>
  );
};

export default Items;
