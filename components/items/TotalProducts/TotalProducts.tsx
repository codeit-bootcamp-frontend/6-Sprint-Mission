import { FC } from 'react';

import ProductCard from '@/components/items/ProductCards';

import styles from './TotalProducts.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
}

interface TotalProductsProps {
  sortedProducts: Product[];
}

const TotalProducts: FC<TotalProductsProps> = ({ sortedProducts }) => {
  return (
    <div className={styles.totalProductContainer}>
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} showLikes />
      ))}
    </div>
  );
};

export default TotalProducts;
