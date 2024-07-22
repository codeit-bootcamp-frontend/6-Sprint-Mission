import { useEffect, useState } from "react";
import { sortItemsByOrder } from "../../lib/sort";
import { AllProducts } from "./Products";
import styles from "./AllItems.module.scss";
import SelectMenu from "./SelectMenu";
import Link from "next/link";
import { ProductSortOption } from "../../types/productTypes";
import useWindowSize from "../../src/hooks/useWindowSize";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { getProducts } from "../../api/getProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function AllItems() {
  const [order, setOrder] = useState<ProductSortOption>("recent");
  const queryClient = useQueryClient();
  const windowWidth = useWindowSize();
  const { register, watch, handleSubmit, setValue, getValues } = useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");

  const {
    data: itemsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["allitems"],
    queryFn: () => getProducts({ pageSize, orderBy: order }),
    retry: 0,
  });

  const items = itemsData?.list ?? [];

  const addKeywordMutation = useMutation({
    mutationFn: (keyword: string) =>
      getProducts({ pageSize, orderBy: order, keyword }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allitems"],
      });
    },
  });

  const addOrderMutation = useMutation({
    mutationFn: (order: ProductSortOption) =>
      getProducts({ pageSize, orderBy: order, keyword }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allitems"],
      });
    },
  });

  const handleKeyword = (keyword: string) => {
    addKeywordMutation.mutate(keyword);
  };

  const handleOrder = (order: ProductSortOption) => {
    addKeywordMutation.mutate(order);
    setOrder(order);
  };

  const sortedItems = sortItemsByOrder(items, order);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.keyword) {
      setKeyword(data.keyword);
    }
    handleKeyword(keyword);
  };

  useEffect(() => {
    if (windowWidth < 768) {
      setPageSize(4);
    } else if (windowWidth < 1199) {
      setPageSize(6);
    } else {
      setPageSize(10);
    }
  }, [windowWidth]);

  // useEffect(() => {
  //   async ({
  //     pageSize,
  //     order,
  //     keyword,
  //   }: {
  //     pageSize: number;
  //     order: ProductSortOption;
  //     keyword: string;
  //   }) => {
  //     let result = await getProducts({ pageSize, orderBy: order, keyword });
  //     const { list } = result;
  //     setAllItems(list);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageSize, order, keyword]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.content}>
            {windowWidth < 1199 ? "판매 중인 상품" : "전체 상품"}
          </h2>
          <div className={styles.search}>
            <span className={styles.search_image} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("keyword")}
                type="search"
                placeholder="검색할 상품을 입력해주세요"
                className={styles.search_input}
              />
            </form>
          </div>
          <Link href="/additem" className={styles.add_item}>
            상품 등록하기
          </Link>
          <span className={styles.select_box_area}>
            <SelectMenu order={order} setOrder={handleOrder} />
          </span>
        </div>
        <div>
          <AllProducts items={sortedItems} counts={pageSize} />
        </div>
        {/* {isError && <span>{loadingError.message}</span>} */}
      </div>
      {/* <Paging
        itemsCount={1}
        totalPageCount={totalPage}
        displayCount={pageSize}
        order={order}
        onClick={handleLoad}
      /> */}
    </>
  );
}

export default AllItems;
