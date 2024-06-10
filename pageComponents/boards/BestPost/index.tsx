import { useEffect, useState } from "react";
import PostElement from "./components/PostElement";
import styles from "./style.module.css";
import useSetNumOfItemsToShow from "@/hooks/useSetNumberOfItemsToShow";
import useLoad from "@/hooks/useLoad";
import { getArticles } from "@/apis/getArticles";
import { FAVORITE, RECENT } from "@/constants/sortBy";

interface ArticleType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

const BestPost = () => {
  const [posts, setPost] = useState<ArticleType[]>([]);
  const numOfItemsToShow = useSetNumOfItemsToShow({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });
  const showedPost = posts.slice(0, numOfItemsToShow);
  const [isLoading, loadingError, handleLoad] = useLoad(getArticles);

  const handleBestPostLoad = async () => {
    const nextPosts = await handleLoad({
      page: 1,
      pageSize: 3,
      orderBy: FAVORITE,
    });
    if (nextPosts) {
      setPost(nextPosts.list);
    }
  };

  useEffect(() => {
    handleBestPostLoad();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.title}>베스트 게시글</header>
      <div className={styles.posts}>
        {loadingError && <div>{loadingError.message}</div>}

        {isLoading ? (
          <div>로딩중</div>
        ) : (
          showedPost.map((post) => {
            return <PostElement key={post.id} post={post} />;
          })
        )}
      </div>
    </div>
  );
};

export default BestPost;
