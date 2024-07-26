import { ChangeEvent, useEffect, useState } from "react";
import Button from "components/Button";
import Loading from "components/Loading";
import Input from "components/Input";
import Card from "components/Card";
import useDeviceState from "hooks/useDeviceState";
import getPageSize from "utils/getPageSize";
import Product from "models/product";
import {
  useCurrentPage,
  useOrder,
  useSetTotalPages,
} from "contexts/react-context/FleaMarket";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "api/product";
import * as S from "./FleaMarket.style";

const DEVICE_PRODUCT_COUNT = {
  mobile: 4,
  tablet: 6,
  desktop: 10,
};

export default function AllProducts() {
  const [keyword, setKeyword] = useState("");
  const orderState = useOrder();
  const currentPage = useCurrentPage();
  const setTotalPages = useSetTotalPages();
  const { deviceState } = useDeviceState();

  const { data, isLoading } = useQuery({
    queryKey: ["products", { deviceState, orderState, currentPage, keyword }],
    queryFn: () => {
      const pageSize = getPageSize(deviceState, DEVICE_PRODUCT_COUNT);
      const order = orderState === "최신순" ? "recent" : "favorite";

      return getProducts({
        page: currentPage,
        pageSize,
        orderBy: order,
        keyword,
      });
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      const pageSize = getPageSize(deviceState, DEVICE_PRODUCT_COUNT);
      const totalPages = Math.ceil(data.totalCount / pageSize);

      setTotalPages(totalPages > 0 ? totalPages : 1);
    }
  }, [data, deviceState, setTotalPages]);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <S.AllProductsContainer>
      <S.AllProductsHeader>
        <S.AllProductsTitle>
          {deviceState === "desktop" ? "전체 상품" : "판매 중인 상품"}
        </S.AllProductsTitle>
        <S.AddItemButtonBox>
          <Button.Link to="/additem">상품 등록하기</Button.Link>
        </S.AddItemButtonBox>
        <S.SearchInputBox>
          <Input.Search value={keyword} onChange={handleKeywordChange} />
        </S.SearchInputBox>
        <S.SelectInputBox>
          <Input.Select />
        </S.SelectInputBox>
      </S.AllProductsHeader>

      {isLoading && <Loading />}
      {!isLoading && data && data.list.length > 0 && (
        <S.AllProductsCards>
          {data.list.map((product: Product, idx: number) => (
            <Card key={idx} data={product} />
          ))}
        </S.AllProductsCards>
      )}
      {!isLoading && data && data.list.length === 0 && (
        <S.NoItems height={500}>상품이 존재하지 않습니다</S.NoItems>
      )}
    </S.AllProductsContainer>
  );
}
