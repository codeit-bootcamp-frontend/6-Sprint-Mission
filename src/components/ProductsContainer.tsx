import React, { useEffect, useState } from 'react';
import '../style/Products.css';
import BestProductsContainer from './BestProductsContainer';
import TotalProductsContainer from './TotalProductsContainer';
import { useSearchParams } from 'react-router-dom';
import PageNation from './Pagination';
import PageNationItem from './PageNationItem';
import PageNationPrevious from './PageNationPrevious';
import PageNationNext from './PageNationNext';

const ProductsContainer = () => {
  const [pageGroup, setPageGroup] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchParams, setSearchParams] = useSearchParams(
    'page=1&pageSize=10&orderBy=recent&group=1'
  );

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='products'>
      <BestProductsContainer windowWidth={windowWidth} />
      <TotalProductsContainer
        searchParams={searchParams}
        windowWidth={windowWidth}
      />
      <PageNation>
        <PageNationPrevious
          searchParams={searchParams}
          pageGroup={pageGroup}
          setPageGroup={setPageGroup}
        >
          {'<'}
        </PageNationPrevious>

        <PageNationItem searchParams={searchParams}>
          {((pageGroup - 1) * 3 + 1).toString()}
        </PageNationItem>
        <PageNationItem searchParams={searchParams}>
          {((pageGroup - 1) * 3 + 2).toString()}
        </PageNationItem>
        <PageNationItem searchParams={searchParams}>
          {((pageGroup - 1) * 3 + 3).toString()}
        </PageNationItem>
        <PageNationNext
          searchParams={searchParams}
          pageGroup={pageGroup}
          setPageGroup={setPageGroup}
        >
          {'>'}
        </PageNationNext>
      </PageNation>
    </div>
  );
};

export default ProductsContainer;

