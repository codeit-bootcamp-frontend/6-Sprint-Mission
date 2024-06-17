import Image from 'next/image';
import React from 'react';
import { format } from 'date-fns';
import styles from './AllPosts.module.css';
import { PostsProps } from '@/type/type';

function AllPosts({ post }: PostsProps) {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <p className={styles.Content}>{post.content}</p>
          <div>
          {post.image && (
              <Image
                src={post.image}
                width={72}
                height={72}
                alt="이미지"
                className={styles.Img}
              />
            )}
          </div>
        </div>
        <div className={styles.InnerContainer}>
          <div className={styles.Group}>
            <Image
              src="/Img/user.svg"
              width={24}
              height={24}
              alt="프로필 이미지"
            />
            <div className={styles.nickname}>{post.writer.nickname}</div>
            <div className={styles.CreatedAt}>
              {format(post.createdAt, 'yyyy. MM. dd')}
            </div>
          </div>
          <div className={styles.HeartGroup}>
            <Image
              src="/Img/heart.svg"
              width={16}
              height={16}
              alt="heart"
              className={styles.Heart}
            />
            <div className={styles.likeCount}>{post.likeCount}</div>
          </div>
        </div>
      </div>
      <div className={styles.Divider} />
    </>
  );
}

export default AllPosts;
