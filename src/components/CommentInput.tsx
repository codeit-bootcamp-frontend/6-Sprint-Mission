import React, { forwardRef } from 'react';
import style from '@/styles/CommentInput.module.css';

interface CommentInputProps {
  registerCommentHandler: () => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CommentInput = forwardRef<HTMLInputElement, CommentInputProps>(
  ({ registerCommentHandler, onChangeHandler }, ref) => {
    return (
      <div className={style.commentFrame}>
        <p className={style.comment}>댓글 달기</p>
        <input
          ref={ref}
          onChange={onChangeHandler}
          className={style.commentInput}
          placeholder='댓글을 입력해주세요.'
        />
        <button
          onClick={registerCommentHandler}
          className={style.registerButton}
        >
          등록
        </button>
      </div>
    );
  }
);

export default CommentInput;

