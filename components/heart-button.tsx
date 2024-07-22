import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import heartImg from '@/public/images/icons/ic_heart.svg';
import emptyHeartImg from '@/public/images/icons/ic_empty-heart.svg';
import { postLike, deleteLike } from '@/lib/api/like';

const HeartButton = ({
  articleId,
  isLiked,
  toggle,
  likeCount,
}: {
  articleId: string;
  isLiked: boolean;
  toggle: boolean;
  likeCount: number;
}) => {
  const [likeCounter, setLikeCounter] = useState(likeCount);

  useEffect(() => {
    setLikeCounter(likeCount);
  }, [likeCount]);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('accessToken');
    }
    return null;
  };

  const handleClick = async () => {
    if (toggle) {
      const token = getToken();
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        if (isLiked === true) {
          await deleteLike(articleId, token);
          setLikeCounter(prev => prev - 1);
        } else {
          await postLike(articleId, token);
          setLikeCounter(prev => prev + 1);
        }
        // toggleLike(articleId);
      } catch (error) {
        console.error('Failed to toggle like:', error);
      }
    }
  };

  return (
    <>
      <Image width={20} src={isLiked ? heartImg : emptyHeartImg} onClick={handleClick} alt='좋아요하트' />
      {likeCounter}
    </>
  );
};

export default HeartButton;
