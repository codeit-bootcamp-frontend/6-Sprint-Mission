import React, { useState, useEffect } from 'react';
import ItemForSale from '../ItemForSale';
import Link from 'next/link';
import styles from './items-for-sale.module.css';
import SelectBox from '../SelectBox';
import { Item } from '@/types';
import Pagination from '@/components/pagination';
import { PAGINATION_DEFAULT } from '@/lib/constants';

type ItemProps = {
  totalCount: number | undefined;
  items: Item[];
};

const { PAGE_NUM, PAGE_SIZE } = PAGINATION_DEFAULT;

export default function ItemsForSale({ items, totalCount: initialTotalCount }: ItemProps) {
  const [itemsToShow, setItemsToShow] = useState(10);
  const [title, setTitle] = useState('판매 중인 상품');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items.slice(0, itemsToShow));
  const [pageNum, setPageNum] = useState(PAGE_NUM);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const handleSort = (criteria: string) => {
    let sortedItems: Item[] = [];
    if (criteria === '최신순') {
      sortedItems = items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (criteria === '좋아요순') {
      sortedItems = items.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }
    setFilteredItems(sortedItems);
  };

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      let itemsToShow, title;

      if (width < 768) {
        itemsToShow = 4;
        title = '판매 중인 상품';
      } else if (width < 1199) {
        itemsToShow = 6;
        title = '판매 중인 상품';
      } else {
        itemsToShow = 10;
        title = '전체 상품';
      }
      setFilteredItems(items);
      setItemsToShow(itemsToShow);
      setTitle(title);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  return (
    <div className={styles.itemsForSale}>
      <div className={styles.searchBar}>
        <h2 className={styles.searchBar__title}>{title}</h2>
        <input
          className={styles.searchBar__input}
          type='text'
          placeholder='검색할 상품을 입력해주세요'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Link href='/add-item'>
          <button className={styles.searchBar__register}>상품 등록하기</button>
        </Link>
        <div className={styles.selectBox}>
          <SelectBox handleSort={handleSort} />
        </div>
      </div>
      <section className={styles.items}>
        {filteredItems?.slice(0, itemsToShow).map(item => (
          <Link key={item.id} href={`/items/${item.id}`}>
            <ItemForSale key={item.id} {...item} />
          </Link>
        ))}
      </section>
      <Pagination pageNum={pageNum} setPageNum={setPageNum} totalCount={totalCount} />
    </div>
  );
}
