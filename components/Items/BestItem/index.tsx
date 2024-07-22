import HeartButton from '@/components/heart-button';
import styles from './best-item.module.css';
import { BestItemType } from '@/types';
import Image from 'next/image';

export default function BestItem({ price, image, favoriteCount, name, id }: BestItemType) {
  const formattedPrice = price.toLocaleString();

  return (
    <div className={styles.item}>
      <Image src={image} width={343} height={343} alt='상품이미지' />

      <div className={styles.item__description}>
        <p className={styles.item__title} onClick={() => {}}>
          {name}
        </p>
        <p className={styles.item__price}>{formattedPrice}원</p>
        <HeartButton likeCount={favoriteCount} toggle={false} isLiked={false} articleId={id.toString()} />
      </div>
    </div>
  );
}
