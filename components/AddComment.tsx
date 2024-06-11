import { useState } from 'react';
import Button from '@/components/Button';
import { addComment } from '@/pages/api/apis';

export default function AddComment({ articleId }: { articleId: string }) {
  const [value, setValue] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const postComment = async () => {
    try {
      await addComment(articleId, value);
      setValue('');
      setBtnDisabled(true);
    } catch (error) {
      console.error('Failed to post comment', error);
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <label htmlFor="comment" className="font-semibold ">
        댓글 달기
      </label>
      <textarea
        className="h-[104px] py-[16px] px-[24px] bg-[#f3f4f6] rounded-xl resize-none"
        id="comment"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          setBtnDisabled(newValue.trim() === '');
        }}
        placeholder="댓글을 입력해주세요"
      />
      <div className="w-[74px] h-[42px] rounded-lg overflow-hidden self-end">
        <Button onClick={postComment} disabled={btnDisabled}>
          등록
        </Button>
      </div>
    </div>
  );
}
