import React, { useEffect, useState } from "react";
import { ArticleResponse, getArticle } from "@/lib/apis/getArticle.api";
import { CommentResponse, getArticleComments } from "@/lib/apis/getComment.api";
import styles from "@/styles/DetailArticle.module.css";
import Image from "next/image";
import formatTime from "@/utils/formatTime";
import ArticleComment from "@/components/ArticleComment";
import { useRouter } from "next/router";

const ArticleWithComment = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [article, setArticle] = useState<ArticleResponse | null>(null);

  const getComments = async (id: string) => {
    const { list } = await getArticleComments(id, 10);
    setComments(list);
  };

  const getSingleArticle = async (id: string) => {
    const data: ArticleResponse = await getArticle(id);
    setArticle(data);
  };

  const setNewComment = (comment: CommentResponse) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  useEffect(() => {
    if (id) {
      getComments(id);
      getSingleArticle(id);
    }
  }, [id]);

  if (!article) {
    return <div style={{ height: "100vh" }}>Loading...</div>;
  }

  return (
    <div className={styles["article-with-comments-wrapper"]}>
      <article className={styles["article-container"]}>
        <div className={styles["article-info__top"]}>
          <h1 className={styles["article-info__top-title"]}>{article.title}</h1>
          <button className={styles["article-info__top-edit-btn"]}>
            <Image src="/images/Articles/hamburger-icon.svg" alt="게시글 수정 버튼" width={24} height={24} />
          </button>
        </div>

        <div className={styles["article-info__bottom"]}>
          <div className={styles["article-info__bottom-left"]}>
            <Image
              className={styles["article-info__bottom-profile"]}
              src="/images/Articles/profile.png"
              alt="게시글 작성자 프로필 이미지"
              width={24}
              height={24}
            />
            <p className={styles["article-info__bottom-writer"]}>{article.writer.nickname}</p>
            <p className={styles["article-info__bottom-createdAt"]}>{formatTime(article.createdAt)}</p>
          </div>
          <div className={styles["article-info__bottom-right"]}>
            <Image
              className={styles["article-info__bottom-like-icon"]}
              src="/images/Articles/likeIcon.svg"
              alt="게시글 좋아요 아이콘"
              width={24}
              height={24}
            />
            <span className={styles["article-info__bottom-likeCount"]}>{article.likeCount}</span>
          </div>
        </div>
        <div className={styles["article-content"]}>
          <p className={styles["article-content-text"]}>{article.content}</p>
          {article.image && (
            <div className={styles["article-content-img"]}>
              <Image src={article.image} alt="게시글 등록 이미지" fill style={{ objectFit: "contain" }} />
            </div>
          )}
        </div>
      </article>
      <ArticleComment comments={comments} setNewComment={setNewComment} />
    </div>
  );
};

export default ArticleWithComment;
