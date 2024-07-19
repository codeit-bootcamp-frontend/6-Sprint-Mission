'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
  getProducts,
  GetProductsParams,
  Product,
} from '@/app/apis/getProducts';
import BestProduct from '@/components/items/BestProducts/BestProducts';
import SearchProducts from '@/components/items/SearchProducts';
import Spinner from '@/components/items/Spinner';
import TotalProducts from '@/components/items/TotalProducts/TotalProducts';
import Pagination from '@/components/Pagination';

import styles from './ProductContent.module.css';

interface ProductContentProps {
  initialProducts: Product[];
  totalCount: number;
}

function ProductContent({ initialProducts, totalCount }: ProductContentProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchProduct, setSearchProduct] = useState('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'favorite'>('recent');
  const [bestProductsCount, setBestProductsCount] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchProducts = async (params: GetProductsParams) => {
    const response = await getProducts(params);
    return response;
  };

  const { data: bestProducts, isLoading: isBestProductsLoading } = useQuery({
    queryKey: ['bestProducts', bestProductsCount],
    queryFn: () =>
      fetchProducts({ orderBy: 'favorite', pageSize: bestProductsCount }),
    staleTime: 60000,
  });

  const { data: productData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products', currentPage, pageSize, sortOrder, searchProduct],
    queryFn: () =>
      fetchProducts({
        page: currentPage,
        pageSize,
        orderBy: sortOrder,
        keyword: searchProduct,
      }),
    staleTime: 60000,
  });

  useEffect(() => {
    if (productData) {
      setProducts(productData.list);
    }
  }, [productData]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 767) {
        setBestProductsCount(1);
        setPageSize(4);
      } else if (screenWidth <= 1200) {
        setBestProductsCount(2);
        setPageSize(6);
      } else {
        setBestProductsCount(4);
        setPageSize(10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchProduct(keyword);
    setCurrentPage(1);
  };

  const handleSortOrder = (order: 'recent' | 'favorite') => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <div className={styles.bestProductContainer}>
        <h3 className={styles.bestTitle}>베스트 상품</h3>
        {isBestProductsLoading ? (
          <Spinner />
        ) : (
          <BestProduct bestProducts={bestProducts?.list ?? []} />
        )}
      </div>
      <div className={styles.totalProductContainer}>
        <div className={styles.totalTitleContainer}>
          <h3 className={styles.totalTitle}>판매중인 상품</h3>
          <SearchProducts
            searchProduct={searchProduct}
            handleSearch={handleSearch}
            handleSortOrder={handleSortOrder}
            sortOrder={sortOrder}
          />
        </div>
        {isProductsLoading ? (
          <Spinner />
        ) : (
          <>
            <TotalProducts sortedProducts={products} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProductContent;
