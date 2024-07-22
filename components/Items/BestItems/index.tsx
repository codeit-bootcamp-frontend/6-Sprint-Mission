import React, { useState, useEffect } from 'react';
import styles from './best-items.module.css';
import BestItem from '@/components/Items/BestItem';
import { ItemProps } from '@/types';
import Link from 'next/link';
export default function BestItems({ list = [] }: ItemProps) {
  const [itemsToShow, setItemsToShow] = useState(getInitialItemsToShow());

  function getInitialItemsToShow() {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) {
        return 1;
      } else if (width < 1199) {
        return 2;
      } else {
        return 4;
      }
    }
  }

  useEffect(() => {
    function handleResize() {
      setItemsToShow(getInitialItemsToShow());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.bestItems}>
      <h2 className={styles.bestItems__title}>베스트 상품</h2>
      <section className={styles.bestItems__item}>
        {list.slice(0, itemsToShow).map(item => (
          <Link key={item.id} href={`/items/${item.id}`}>
            <BestItem
              key={item.id}
              id={item.id}
              price={item.price}
              favoriteCount={item.favoriteCount}
              name={item.name}
              image={item.images[0]}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
