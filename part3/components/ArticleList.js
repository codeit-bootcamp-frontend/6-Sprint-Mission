import Image from "next/image";
import styles from "./ArticleList.module.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

export default function ArticleList({ articles = [] }) {
  return (
    <ul className={styles.article_contain}>
      {articles.map((article) => (
        <li key={article.id}>
          <div className={styles.container}>
            <p className={styles.title_text}>{article.title}</p>
            {article.image && (
              <div className={styles.image_size}>
                <Image
                  fill
                  src={article.image}
                  alt="이미지"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.container}>
            <div className={styles.writer_info_wrap}>
              <p className={styles.nickname}>{article.writer.nickname}</p>
              <p className={styles.write_time}>
                {formatDate(article.createdAt)}
              </p>
            </div>
            <p className={styles.like_count}>{article.likeCount}</p>
          </div>
          <hr className={styles.hr_style}/>
        </li>
      ))}
    </ul>
  );
}
