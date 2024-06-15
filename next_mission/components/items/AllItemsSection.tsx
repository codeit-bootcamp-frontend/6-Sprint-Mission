import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import ItemCard from './ItemCard';
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from '@/types/productTypes';
import useViewport from '@/hooks/useViewport';
import { getProducts } from '@/api/itemApi';
import SearchBar from '../ui/SearchBar';
import { useRouter } from 'next/router';
import LoadingSpinner from '../ui/LoadingSpinner';

const getPageSize = (width: number) => {
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
};

const AllItemsSection = () => {
  const [orderBy, setOrderBy] = useState<ProductSortOption>('recent');
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [itemList, setItemList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const viewportWidth = useViewport();

  useEffect(() => {
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  useEffect(() => {
    if (pageSize === null) return;

    const fetchSortedData = async () => {
      setIsLoading;
      try {
        const data: ProductListResponse = await getProducts({
          orderBy,
          pageSize,
        });
        setItemList(data.list);
      } catch (error) {
        console.error('Error: ', (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSortedData();
  }, [orderBy, pageSize]);

  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption);
  };

  const handleSearch = (searchKeyword: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: searchKeyword },
    });
  };

  return (
    <>
      <section className="flex flex-col gap-6 w-[1200px] m-auto">
        <div className="flex">
          <header>판매 중인 상품</header>
          <SearchBar onSearch={handleSearch} />
          <Button>상품 등록하기</Button>
          <Dropdown
            onSortSelection={handleSortSelection}
            sortOptions={[
              { key: 'recent', label: '최신순' },
              { key: 'favorite', label: '인기순' },
            ]}
          />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex gap-10">
            {itemList?.map((item) => (
              <ItemCard item={item} key={`market-item-${item.id}`} />
            ))}
          </div>
        )}
        <div>페이지 네이션</div>
      </section>
    </>
  );
};

export default AllItemsSection;
