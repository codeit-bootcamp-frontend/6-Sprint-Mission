import { useEffect, useState } from "react";
import { BestProducts } from "./Products";
import { sortItemsByOrder } from "../../lib/sort";
import styles from "./BestItems.module.scss";
import useWindowSize from "../../src/hooks/useWindowSize";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../api/getProduct";

function BestItems() {
  const windowWidth = useWindowSize();
  const [pageSize, setPageSize] = useState(4);

  const {
    data: itemsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["bestitems"],
    queryFn: () => getProducts({ pageSize, orderBy: "favorite" }),
    retry: 0,
  });

  // const items = itemsData?.results ?? [];
  const items = itemsData?.list ?? [];

  const sortedItems = sortItemsByOrder(items, "favorite");

  useEffect(() => {
    if (windowWidth < 768) {
      setPageSize(1);
    } else if (windowWidth < 1199) {
      setPageSize(2);
    } else {
      setPageSize(4);
    }
  }, [windowWidth]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.content}>베스트 상품</h2>
      </div>
      <BestProducts items={sortedItems} counts={pageSize} />
      {/* {loadingError?.message && <span>{loadingError.message}</span>} */}
    </div>
  );
}

export default BestItems;
