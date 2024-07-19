'use client';
import Image from 'next/image';
import { useState } from 'react';

import { RootObject } from '@/app/apis/getArticleDetail';
import profileImg from '@/app/assets/images/ic_profile.png';
import { formatDate } from '@/app/utils/formateDate';
import styles from '@/components/BoardDetail/BoardDetail.module.css';
import DropdownMenu from '@/components/DropDown';
import ImageModal from '@/components/ImageModal';

import LikeButton from './LikeButton';

type Props = {
  article: RootObject;
};

export default function BoardDetail({ article }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{article.title}</div>
          <DropdownMenu articleId={article.id} />
        </div>
        <div className={styles.tagWrapper}>
          <div className={styles.writerInfo}>
            <Image src={profileImg} alt="프로필아이콘" width={24} height={24} />
            <span className={styles.writer}>{article.writer.nickname}</span>
            <span className={styles.date}>{formatDate(article.createdAt)}</span>
          </div>
          <LikeButton
            articleId={article.id}
            initialLikeCount={article.likeCount}
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{article.content}</div>
        <div className={styles.imageWrapper}>
          {article.image && (
            <Image
              src={article.image}
              alt="Article Image"
              className={styles.image}
              width={72}
              height={72}
              onClick={openModal}
            />
          )}
        </div>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={article.image || ''}
      />
    </div>
  );
}
