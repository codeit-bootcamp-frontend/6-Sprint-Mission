import { getProducts } from '@/api/itemApi';
import useViewport from '@/hooks/useViewport';
import { Product, ProductListResponse } from '@/types/productTypes';
import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

const getPageSize = (width: number) => {
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

const BestItemsSection: React.FC = () => {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      try {
        const data: ProductListResponse = await getProducts({
          orderBy: 'favorite',
          pageSize,
        });
        setItemList(data.list);
      } catch (error) {
        console.error('오류: ', (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSortedData();
  }, [pageSize]);

  return (
    <>
      <div>
        <header>베스트 상품</header>
        <section>
          {itemList?.map((item) => (
            <ItemCard item={item} key={`best-item-${item.id}`} />
          ))}
        </section>
      </div>
    </>
  );
};

export default BestItemsSection;
