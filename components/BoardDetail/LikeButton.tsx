// LikeButton.tsx
'use client';
import Image from 'next/image';

import heartfill from '@/app/assets/images/fillheart.png';
import heartImg from '@/app/assets/images/ic_heart.svg';
import useLike from '@/app/hooks/useLike';
import styles from '@/components/BoardDetail/BoardDetail.module.css';

type Props = {
  articleId: number;
  initialLikeCount: number;
};

export default function LikeButton({ articleId, initialLikeCount }: Props) {
  const { likeCount, isLiked, handleLikeClick } = useLike(
    articleId,
    initialLikeCount,
  );

  return (
    <div className={styles.likeCount} onClick={handleLikeClick}>
      <Image
        src={isLiked ? heartfill : heartImg}
        alt="좋아요아이콘"
        width={24}
        height={24}
      />
      {likeCount}
    </div>
  );
}
