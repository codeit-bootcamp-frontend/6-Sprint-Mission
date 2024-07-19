import ProductContent from '@/components/items/ProductContent';

import { getProducts } from '../apis/getProducts';
import styles from './pages.module.css';

async function ProductPage() {
  const productsData = await getProducts({ page: 1, pageSize: 10 });

  if (!productsData) {
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={styles.productContainer}>
      <ProductContent
        initialProducts={productsData.list}
        totalCount={productsData.totalCount}
      />
    </div>
  );
}

export default ProductPage;
