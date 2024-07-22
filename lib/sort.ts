import { Product, ProductSortOption } from "../types/productTypes";

export const sortItemsByOrder = (
  items: Product[],
  order: ProductSortOption
) => {
  const sortedItems: Product[] = items.sort((a, b): number => {
    if (order === "favorite") {
      if (a.favoriteCount < b.favoriteCount) {
        return 1;
      }
      if (a.favoriteCount > b.favoriteCount) {
        return -1;
      }

      return 0;
    } else if (order === "recent") {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }

      return 0;
    } else return 0;
  });
  return sortedItems;
};
