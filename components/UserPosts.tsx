import styles from "./UserPosts.module.css";

import PostArticles from "./PostArticles";
import SearchBar from "./SearchBar";
import PostOrderMenus from "./PostOrderMenus";
// import { useState } from "react";

import { PostArticlesProps, ArticlesArray } from "@/types/articlesType";

type UserArticlesProps = PostArticlesProps[];

export default function UserPosts({ userArticles }) {
  // const [search, setSearch] = useState(articles);

  // const handleChange = (e) => {
  //   const userSearch = e.target.value;
  // }

  return (
    <div className={styles.userPosts}>
      <div className={styles.searchAndOrderMenus}>
        <SearchBar />
        <PostOrderMenus />
      </div>
      <ul className={styles.userPost}>
        {userArticles.map((article: PostArticlesProps) => (
          <PostArticles key={article.id} {...article} />
        ))}
      </ul>
    </div>
  );
}
