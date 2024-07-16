import React from 'react';
import style from '@/styles/Post.module.css';
import profile from '@/src/img/profile.png';
import heart from '@/src/img/heart.png';
import { convertTime } from '../util/convertTime';

interface postItem {
  image: string | null;
  content: string;
  likeCount: number;
  nickName: string;
  createdAt: string;
  id: number;
  onClickHandler: (id: number) => void;
}

const Post = ({
  image,
  content,
  likeCount,
  nickName,
  createdAt,
  id,
  onClickHandler,
}: postItem) => {
  const contentDate = convertTime(createdAt);
  return (
    <div className={style.postFrame} onClick={() => onClickHandler(id)}>
      <div className={style.contentFrame}>
        <p className={style.content}>{content}</p>
        {image ? (
          <img
            className={style.contentImage}
            src={image as string}
            alt='상세이미지'
          />
        ) : (
          <div className={style.noImage} />
        )}
      </div>
      <div className={style.userInfoFrame}>
        <div className={style.userInfo}>
          <img className={style.profileImage} src={profile.src} alt='프로필' />
          <p className={style.nickName}>{nickName}</p>
          <p className={style.contentDate}>{contentDate}</p>
        </div>
        <div className={style.likeInfo}>
          <img src={heart.src} alt='하트' />
          <p>{likeCount}+</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

