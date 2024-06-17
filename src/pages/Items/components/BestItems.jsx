import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { getList } from '@/api/api';

const PAGE_SIZE = 4;

function BestItems({ titleClassName }) {
  const [items, setItems] = useState([]);

  const handleLoad = async (options) => {
    const { list } = await getList(options);
    setItems(list);
  };

  useEffect(() => {
    handleLoad({ orderBy: 'favorite', pageSize: PAGE_SIZE });
  }, []);

  return (
    <div>
      <div className={titleClassName}>베스트 상품</div>
      <ItemList items={items} className="best" />
    </div>
  );
}

export default BestItems;
