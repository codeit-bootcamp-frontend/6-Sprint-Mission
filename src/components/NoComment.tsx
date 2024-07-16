import React from 'react';
import noComment from '@/src/img/noComment.png';
import style from '@/styles/NoComment.module.css';
const NoComment = () => {
  return (
    <img className={style.noComment} src={noComment.src} alt='댓글 없음'></img>
  );
};

export default NoComment;

