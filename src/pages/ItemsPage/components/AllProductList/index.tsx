import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { getProducts } from 'api/productApi';
import ProductItem from 'components/ProductItem';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import ProductControl from './ProductControl';
import { MOBILE_SIZE, TABLET_SIZE } from 'constants/windowSize';
import { ALL } from 'constants/productItems';
import './style.css';
import { ItemType } from 'types/item';
import { type OrderType } from 'constants/orderOption';

interface LoadOptions {
  page: number;
  pageSize: number;
  orderBy: OrderType;
}

const AllProductList = () => {
  const [allProduct, setAllProduct] = useState<ItemType[]>([]);
  const [orderBy, setOrderBy] = useState<OrderType>('recent');
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const handleAllProductLoad = async (options: LoadOptions) => {
    let result;
    try {
      setLoadingError(null);
      result = await getProducts(options);

      const { list, totalCount } = result;

      setTotal(totalCount);
      setAllProduct(list);
    } catch (error) {
      setLoadingError(error as Error);
      return;
    }
  };

  const handlePagination = (_: ChangeEvent<unknown>, value: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPage(value);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MOBILE_SIZE) {
        setPageSize(ALL.MOBILE_CNT);
      } else if (window.innerWidth < TABLET_SIZE) {
        setPageSize(ALL.TABLET_CNT);
      } else {
        setPageSize(ALL.DEFAULT_CNT);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleAllProductLoad({ page, pageSize, orderBy });
  }, [page, pageSize, orderBy]);

  return (
    <section>
      <div className="top-container">
        <h3>전체 상품</h3>
        <ProductControl
          search={search}
          setSearch={setSearch}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          pageSize={pageSize}
        />
      </div>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <Grid container spacing={2}>
        {allProduct.map((item) => (
          <Grid item xs={6} sm={4} md={2.4} key={item.id}>
            <ProductItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className="pagination">
        <Pagination
          count={Math.ceil(total / pageSize)}
          page={page}
          onChange={handlePagination}
          color="primary"
        />
      </div>
    </section>
  );
};

export default AllProductList;
