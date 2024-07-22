import { useEffect, useState } from 'react';
import { ItemResponse, getItemsId } from '@/lib/api/items';

export default function useItem(productId: number | undefined) {
  const [item, setItem] = useState<ItemResponse | null>(null);

  useEffect(() => {
    const fetchItemsWithId = async () => {
      try {
        if (productId) {
          const data = await getItemsId(productId);
          if (!data) {
            window.alert('존재하지 않는 상품입니다.');
          } else {
            setItem(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchItemsWithId();
  }, [productId]);

  return item;
}
