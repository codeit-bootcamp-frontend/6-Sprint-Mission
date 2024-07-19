import { Product } from '@/app/apis/getProducts';

import ProductCard from '../ProductCards';
import styles from './BestProducts.module.css';

interface BestProductProps {
  bestProducts: Product[];
}

const BestProduct = ({ bestProducts }: BestProductProps) => {
  return (
    <div className={styles.bestProductContainer}>
      {bestProducts.map((product) => (
        <ProductCard key={product.id} product={product} showLikes />
      ))}
    </div>
  );
};

export default BestProduct;
