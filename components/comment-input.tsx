import { postComment } from '@/lib/api/postComment';
import SubmitButton from '@/components/submit-btn';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

type Props = {
  id: string;
  onNewComment: () => void;
};

export default function CommentForm({ id, onNewComment }: Props) {
  const [comment, setComment] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const localToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await postComment(comment, id, token);
      if (response) {
        setComment('');
        onNewComment();
      } else {
        console.error('댓글 작성 실패');
      }
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className='font-semibold' htmlFor='comment'>
        댓글달기
      </label>
      <textarea
        id='comment'
        value={comment}
        onChange={handleChange}
        className='w-[343px] md:w-[696px] lg:w-[1200px] min-w-[344px] h-[104px] rounded-2xl py-4	px-6 my-4'
        placeholder='댓글을 입력해주세요'
      />
      <div className='flex justify-end'>
        <SubmitButton checkValue={comment.length > 0 ? true : false}>등록</SubmitButton>
      </div>
    </form>
  );
}
