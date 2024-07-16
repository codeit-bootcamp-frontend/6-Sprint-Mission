import React from 'react';
import kebab from '@/src/img/kebab.png';
import profile from '@/src/img/profile.png';
import style from '@/styles/Comment.module.css';
import { getCreatedTime } from '../util/getCreatedTime';
interface commentProps {
  content: string;
  image: string | null;
  nickName: string;
  createdAt: string;
}
const Comment = ({ content, image, nickName, createdAt }: commentProps) => {
  const { day, hours } = getCreatedTime(createdAt);
  return (
    <div className={style.commentFrame}>
      <div className={style.contentFrame}>
        <p className={style.content}>{content}</p>
        <button className={style.kebabButton}>
          <img className={style.kebabImage} src={kebab.src} alt='케밥' />
        </button>
      </div>
      <div className={style.userInfoFrame}>
        <img
          className={style.profile}
          src={image ? image : profile.src}
          alt='프로필'
        />
        <div>
          <p className={style.nickName}>{nickName}</p>
          <p className={style.createdAt}>{`${day}일 ${hours}시간 전`}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;

