import React from 'react';
import { getProducts } from 'api/productApi';
import ProductItem from 'components/ProductItem';
import Grid from '@mui/material/Grid';
import styles from './style.module.css';
import { useQuery } from '@tanstack/react-query';

const BestProductList = () => {
  const {
    data: bestProduct,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', 'list'],
    queryFn: () => getProducts({ pageSize: 4, orderBy: 'favorite' }),
  });

  return (
    <section>
      <h3>베스트 상품</h3>
      {isPending && <span>로딩중...</span>}
      {isError && <span>{error.message}</span>}
      <Grid container spacing={2}>
        {bestProduct?.list.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item.id}
              className={`${styles[`item-${index}`]}`}
            >
              <ProductItem item={item} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default BestProductList;
