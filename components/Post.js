import styles from "@/components/Post.module.css";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import postSearchIcon from "@/public/post-search-icon.png";
import orderMenuIcon from "@/public/ic_arrow_down.png";
import PostArticles from "./PostArticles";

export default function Post() {
  const [articles, setArticles] = useState([]);

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

  console.log(articles);

  return (
    <section className={styles.post}>
      <div className={styles.postTitleWrap}>
        <h1 className={styles.postTitle}>게시글</h1>
        <button className={styles.postAddItem}>글쓰기</button>
      </div>
      <div className={styles.userPostWrap}>
        <div className={styles.searchBar}>
          <div className={styles.inputWrap}>
            <Image
              src={postSearchIcon}
              width={24}
              height={24}
              alt='검색 아이콘'
            />
            <input
              className={styles.searchInput}
              type='text'
              placeholder='검색할 상품을 입력해주세요'
            />
          </div>
          <div className={styles.postOrderMenus}>
            <div className={styles.postOrderMenu}>
              <span>
                최신 순
                <Image
                  src={orderMenuIcon}
                  width={24}
                  height={24}
                  alt='화살표 아이콘'
                />
              </span>
            </div>
            <ul className={styles.orderOptions}>
              <li className={styles.orderOption}>
                <span>최신 순</span>
              </li>
              <li className={styles.orderOption}>
                <span>좋아요 순</span>
              </li>
            </ul>
          </div>
        </div>
        <ul className={styles.userPosts}>
          {articles.map((article) => (
            <PostArticles key={article.id} {...article} />
          ))}
        </ul>
      </div>
    </section>
  );
}
