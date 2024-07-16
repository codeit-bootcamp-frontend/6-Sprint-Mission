import React from 'react';
import style from '@/styles/Board.module.css';
import { articleType } from '../api/apiType';
import kebab from '@/src/img/kebab.png';
import profile from '@/src/img/profile.png';
import heart from '@/src/img/heart.png';
import { convertTime } from '../util/convertTime';
import CommentContainer from './CommentContainer';
import Link from 'next/link';
import backButton from '@/src/img/back.png';
const Board = ({ article }: { article: articleType }) => {
  const createdAt = convertTime(article.createdAt);

  return (
    <div className={style.boardFrame}>
      <div className={style.articleFrame}>
        <h2 className={style.title}>{article.title}</h2>
        <button className={style.kebabButton}>
          <img className={style.kebabImage} src={kebab.src} alt='케밥버튼' />
        </button>
      </div>
      <div className={style.boardDataFrame}>
        <img
          className={style.profileImage}
          src={profile.src}
          alt='프로필이미지'
        />
        <p className={style.nickName}>{article.writer.nickname}</p>
        <p className={style.createdAt}>{createdAt}</p>
        <img className={style.likeImage} src={heart.src} alt='좋아요' />
        <p className={style.likeCount}>{article.likeCount}</p>
      </div>
      <p className={style.content}>{article.content}</p>
      <CommentContainer />

      <Link className={style.backButton} href={'/boards'}>
        목록으로 돌아가기
        <img className={style.backButtonImage} src={backButton.src} />
      </Link>
    </div>
  );
};

export default Board;

