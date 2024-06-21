import React from "react";
import { ArticleType } from "@/types/type";
import Image from "next/image";
import styles from "@/styles/ArticleDetails.module.css";
import ic_kebab from "@/public/icon/ic_kebab.svg";
import profileimg from "@/public/user/userprofile.svg";
import ic_heart from "@/public/icon/ic_heart.svg";

interface ArticleDetailsProps {
  details: ArticleType;
}

export default function ArticleDetails({ details }: ArticleDetailsProps) {
  const date = new Date(details.updatedAt).getDate();
  const month = new Date(details.updatedAt).getMonth() + 1;
  const year = new Date(details.updatedAt).getFullYear();
  const createdDate = `${year}. ${month}. ${date}`;
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsTop}>
          <h2 className={styles.detailsTitle}>{details.title}</h2>
          <button className={styles.editButton}>
            <Image
              src={ic_kebab}
              alt="게시글 수정 버튼"
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className={styles.detailsBottom}>
          <div className={styles.profileSection}>
            <Image
              className={styles.profileImage}
              src={profileimg}
              alt="게시글 작성자 프로필 이미지"
              width={24}
              height={24}
            />
            <p className={styles.writer}>{details.writer.nickname}</p>
            <p className={styles.createdAt}>{createdDate}</p>
          </div>
          <div className={styles.likeSection}>
            <Image
              className={styles.likeIcon}
              src={ic_heart}
              alt="게시글 좋아요 아이콘"
              width={24}
              height={24}
            />
            <span className={styles.likeCount}>{details.likeCount}</span>
          </div>
        </div>
        <div className={styles.detailsContent}>{details.content}</div>
        {details.image && (
          <div className={styles.detailsImg}>
            <Image
              className={styles.articleImage}
              src={details.image}
              alt="Article"
              width={500}
              height={300}
            />
          </div>
        )}
      </div>
    </div>
  );
}
