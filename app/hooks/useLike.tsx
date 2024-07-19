import { useState } from 'react';

import { deleteLike, postLike } from '@/app/apis/postLike';

export default function useLike(articleId: number, initialLikeCount: number) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    if (isLiked === true) {
      // 좋아요 취소
      try {
        await deleteLike(articleId);
        setLikeCount((prevCount) => prevCount - 1);
        setIsLiked(false);
      } catch (error) {
        console.error('Failed to delete like:', error);
      }
    } else {
      // 좋아요 추가
      const response = await postLike(articleId);
      if (response) {
        setLikeCount(response.likeCount);
        setIsLiked(response.isLiked);
      }
    }
  };

  return { likeCount, isLiked, handleLikeClick };
}
