import Card from "components/Card";
import Loading from "components/Loading";
import useDeviceState from "hooks/useDeviceState";
import Product from "models/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "api/product";
import { DeviceProductCount } from "models/device";
import getPageSize from "utils/getPageSize";
import * as S from "./FleaMarket.style";

const DEVICE_PRODUCT_COUNT: DeviceProductCount = {
  mobile: 1,
  tablet: 2,
  desktop: 4,
};

export default function BestProducts() {
  const { deviceState } = useDeviceState();
  const { data, isLoading } = useQuery({
    queryKey: ["products", "best", { deviceState }],
    queryFn: () => {
      const pageSize = getPageSize(deviceState, DEVICE_PRODUCT_COUNT);

      return getProducts({ pageSize, orderBy: "favorite" });
    },
    placeholderData: keepPreviousData,
  });

  return (
    <S.BestProductsContainer>
      <h1 className="title">베스트 상품</h1>

      {isLoading && <Loading height={300} />}
      {!isLoading && data && data.list.length > 0 && (
        <S.BestProductsCards>
          {data.list.map((product: Product, idx: number) => (
            <Card key={idx} data={product} />
          ))}
        </S.BestProductsCards>
      )}
      {!isLoading && data && data.list.length === 0 && (
        <S.NoItems height={300}>상품이 존재하지 않습니다</S.NoItems>
      )}
    </S.BestProductsContainer>
  );
}
