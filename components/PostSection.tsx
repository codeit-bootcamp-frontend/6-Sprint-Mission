import styles from "./Post.module.css";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import UserPosts from "./UserPosts";
import { PostArticlesProps } from "@/types/articlesType";

export default function PostSection() {
  const [articles, setArticles] = useState<PostArticlesProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function getArticles() {
    try {
      const res = await axios.get("/articles?page=1&pageSize=6&orderBy=recent");
      const nextArticles = res.data.list ?? [];
      setArticles(nextArticles);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  const handleClick = () => {
    router.push("/addboard");
  };

  return (
    <section className={styles.post}>
      <div className={styles.postTitleWrap}>
        <h1 className={styles.postTitle}>게시글</h1>
        <button className={styles.postAddItem} onClick={handleClick}>
          글쓰기
        </button>
      </div>
      <UserPosts userArticles={articles} />
    </section>
  );
}
