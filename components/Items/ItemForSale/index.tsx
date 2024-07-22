import React from 'react';
import styles from './item-for-sale.module.css';
import { ItemForSaleType } from '@/types';
import Image from 'next/image';
import HeartButton from '@/components/heart-button';

export default function ItemForSale({ price, images, favoriteCount, name, id }: ItemForSaleType) {
  const formattedPrice = price.toLocaleString();

  return (
    <div className={styles.item}>
      <Image src={images[0]} width={343} height={343} alt='상품이미지' />
      <div className={styles.itemForSale__description}>
        <p className={styles.itemForSale__title} onClick={() => {}}>
          {name}
        </p>
        <p className={styles.itemForSale__price}>{formattedPrice}원</p>
        <HeartButton likeCount={favoriteCount} toggle={false} isLiked={false} articleId={id.toString()} />
      </div>
    </div>
  );
}
