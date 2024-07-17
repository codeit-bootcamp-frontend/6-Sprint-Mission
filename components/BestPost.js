import styles from "@/components/BestPost.module.css";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import BestPostArticles from "./BestPostArticles";

export default function BestPost() {
  const [bestArticles, setBestArticles] = useState([]);

  async function getBestArticles() {
    try {
      const res = await axios.get("articles?page=1&pageSize=3&orderBy=like");
      const nextArticles = res.data.list ?? [];
      setBestArticles(nextArticles);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBestArticles();
  }, []);

  return (
    <section className={styles.bestPost}>
      <h1 className={styles.bestPostTitle}>베스트 게시글</h1>
      <ul className={styles.bestItems}>
        {bestArticles.map((item) => (
          <BestPostArticles key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
}
