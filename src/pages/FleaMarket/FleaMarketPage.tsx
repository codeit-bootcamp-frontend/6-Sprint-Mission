/* eslint-disable @typescript-eslint/no-redeclare */
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import BestProducts from './BestProducts';
import AllProducts from './AllProducts';
import { getAllProducts, getBestProducts } from '../../api/api';
import Pagination from './Pagination';
import usePagination from '../../hooks/usePagination';
import { Product } from '../../types';

const PAGE_SIZE = 10;

function FleaMarketPage() {
  const [orderBy, setOrderBy] = useState('recent');
  const [totalCount, setTotalCount] = useState(0);

  // 페이지네이션
  const { page, setPage, pageNumbers, handleNextPage, handlePrevPage, handleClickPageNum } =
    usePagination<Product>(1, totalCount, PAGE_SIZE, async ({ page, pageSize, orderBy }) => {
      const data = await getAllProducts({ page, pageSize, orderBy });
      return data;
    });

  // 전체 상품
  const {
    status: allProductsStatus,
    error: allProductsError,
    data: allProductsData,
  } = useQuery({
    queryKey: ['products', page, orderBy],
    queryFn: () => getAllProducts({ page, pageSize: PAGE_SIZE, orderBy }),
  });

  // 베스트 상품
  const {
    status: bestProductStatus,
    data: bestProductsData,
    error: bestProductsError,
  } = useQuery({
    queryKey: ['bestProducts'],
    queryFn: getBestProducts,
  });

  const sliceBestProductsData = bestProductsData?.list?.slice(0, 4);

  useEffect(() => {
    setTotalCount(allProductsData?.totalCount);
  }, [totalCount]);

  useEffect(() => {
    setPage(1);
  }, [orderBy]);

  if (allProductsStatus === 'pending') return <h1>Loading...</h1>;
  if (allProductsStatus === 'error') return <h1>{allProductsError.message}</h1>;

  if (bestProductStatus === 'pending') return <h1>Loading...</h1>;
  if (bestProductStatus === 'error') return <h1>{bestProductsError.message}</h1>;

  return (
    <>
      <Helmet>
        <title>중고마켓</title>
      </Helmet>
      <FleaMarketContainer>
        {bestProductStatus === 'success' && (
          <BestProducts bestProducts={sliceBestProductsData || []} />
        )}
        {allProductsStatus === 'success' && (
          <>
            <AllProducts products={allProductsData?.list || []} setOrderBy={setOrderBy} />
            <Pagination
              page={page}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleClickPageNum={handleClickPageNum}
              pageNumbers={pageNumbers}
            />
          </>
        )}
      </FleaMarketContainer>
    </>
  );
}

const FleaMarketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const ErrorContainer = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-top: 250px;
`;

export default FleaMarketPage;
