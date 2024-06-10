import React from "react";
import styles from "@/styles/Articles.module.css";
import { WriterResponse } from "@/lib/apis/getArticle.api";
import Image from "next/image";
import formatTime from "@/utils/formatTime";

export type Props = {
  createdAt: string;
  image: string;
  likeCount: number;
  title: string;
  writer: WriterResponse;
};

const Article = ({ createdAt, image, likeCount, title, writer }: Props) => {
  return (
    <article className={styles[image ? "article-item" : "article-item__none-img"]}>
      <div className={styles["article-item-top"]}>
        <p className={styles["article-item-top__title"]}>{title}</p>
        {image && (
          <Image className={styles["article-item-top__img"]} src={image} alt="게시글 이미지" width={72} height={72} />
        )}
      </div>
      <div className={styles["article-item-bottom"]}>
        <div className={styles["article-item-bottom__left"]}>
          <Image
            className={styles["article-item-bottom__profile"]}
            src="/images/Articles/profile.png"
            alt="게시글 작성자 프로필 이미지"
            width={24}
            height={24}
          />
          <span className={styles["article-item-bottom__name"]}>{writer.nickname}</span>
          <span className={styles["article-item-bottom__createdAt"]}>{formatTime(createdAt)}</span>
        </div>
        <div className={styles["article-item-bottom__right"]}>
          {likeCount > 0 && (
            <>
              <Image
                className={styles["article-item-bottom__like"]}
                src="/images/Articles/likeIcon.svg"
                alt="게시글 좋아요 아이콘"
                width={24}
                height={24}
              />
              <span className={styles["article-item-bottom__likeCount"]}>{likeCount}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default Article;
