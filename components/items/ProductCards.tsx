import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import styles from './ProductsCard.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
}

interface ProductCardProps {
  product: Product;
  showLikes?: boolean;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0, // 소수점 이하 숫자를 표시하지 않음
  }).format(price);
};

const ProductCard: FC<ProductCardProps> = ({ product, showLikes = false }) => {
  const { id, name, price, images, favoriteCount } = product;

  return (
    <Link href={`/items/${id}`} className={styles.productCardWrapper}>
      <Image
        src={images[0]}
        alt={name}
        width={221}
        height={290}
        className={styles.productImage}
      />
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productPrice}>{formatPrice(price)}</p>
      {showLikes && (
        <p className={styles.productLikes}>
          {favoriteCount !== 0 ? '❤️' : '🤍'} {favoriteCount}
        </p>
      )}
    </Link>
  );
};

export default ProductCard;
