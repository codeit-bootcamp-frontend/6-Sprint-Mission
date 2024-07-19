'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { postComment } from '@/app/apis/postComments';
import styles from '@/components/BoardDetail/CommentInput.module.css';

interface CommentInputProps {
  articleId: number;
}

export default function CommentInput({ articleId }: CommentInputProps) {
  const [comment, setComment] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postComment(articleId, comment, token);
      setComment('');
      router.refresh();
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          등록
        </button>
      </div>
    </form>
  );
}
