import styles from './items.module.css';
import BestItems from '@/components/Items/BestItems';
import ItemsForSale from '@/components/Items/ItemsForSale';
import { useState, useEffect } from 'react';
import { getItems } from '@/lib/api/items';
import { Item, ItemProps } from '@/types';

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [totalCount, setTotalCount] = useState<number | undefined>(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data: ItemProps = await getItems();
        const wholeItems = data.list ?? [];
        const { totalCount: initialCount } = data;
        setItems(wholeItems);
        setTotalCount(initialCount);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchItems();
  }, []);

  const getBestItems = (): Item[] => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => b.favoriteCount - a.favoriteCount);
    return sortedItems.slice(0, 4);
  };

  return (
    <div className={styles.main}>
      <BestItems list={getBestItems()} />
      <ItemsForSale items={items} totalCount={totalCount} />
    </div>
  );
}
