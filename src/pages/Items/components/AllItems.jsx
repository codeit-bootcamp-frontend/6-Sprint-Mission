import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { getList } from '@/api/api';
import styles from '@/styles/AllItems.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Sort from '@/components/Sort';

const PAGE_SIZE = 10;

function AllItems({ titleClassName }) {
  const [orderBy, setOrderBy] = useState('recent');
  const [items, setItems] = useState([]);

  const sortedItems = items?.sort((a, b) => b[orderBy] - a[orderBy]);

  const handleNewestClick = () => setOrderBy('recent');
  const handleBestClick = () => setOrderBy('favorite');

  const handleLoad = async (options) => {
    const { list } = await getList(options);
    setItems(list);
  };

  useEffect(() => {
    handleLoad({ orderBy, page: 1, pageSize: PAGE_SIZE });
  }, [orderBy]);

  return (
    <div className={styles.all_items}>
      <div className={styles.top}>
        <div className={titleClassName}>판매 중인 상품</div>
        <div className={styles.right}>
          <Input placeholder="검색할 상품을 입력해주세요" type="search" />
          <Button>상품 등록하기</Button>
          <Sort />
        </div>
      </div>

      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ItemList items={sortedItems} />
    </div>
  );
}

export default AllItems;
