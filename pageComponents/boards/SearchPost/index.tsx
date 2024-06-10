import { FormEvent, useEffect, useState, useRef } from "react";
import SelectOrderButton from "@/components/SelectOrderButton";
import PostElement from "./components/PostElement";
import styles from "./style.module.css";
import Image from "next/image";
import ic_search from "@/images/ic_search.svg";
import { FAVORITE, RECENT } from "@/constants/sortBy";
import useLoad from "@/hooks/useLoad";
import { getArticles } from "@/apis/getArticles";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useRouter } from "next/router";

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

const SearchPost = () => {
  const [posts, setPost] = useState<ArticleType[]>([]);
  const [order, setOrder] = useState(RECENT);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, loadingError, handleLoad] = useLoad(getArticles);
  const router = useRouter();

  const scrollAction = async () => {
    const nextPosts = await handleLoad({
      page: page + 1,
      pageSize: 5,
      orderBy: order,
      keyword: keyword,
    });
    if (nextPosts) {
      setPost((prev) => [...prev, ...nextPosts.list]);
    }

    setPage((prev) => prev + 1);
  };

  const lastPostElement = useInfiniteScroll(scrollAction);

  const handleChangeOrder = (order: string) => {
    setOrder(order);
    setPage(1);
  };

  const handlePostLoad = async () => {
    const nextPosts = await handleLoad({
      page: page,
      pageSize: 5,
      orderBy: order,
      keyword: keyword,
    });
    if (nextPosts) {
      setPost(nextPosts.list);
    }
  };

  //검색
  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    setKeyword(target["search"].value);

    const nextPosts = await handleLoad({
      page: 1,
      pageSize: 5,
      orderBy: order,
      keyword: target["search"].value,
    });
    if (nextPosts) {
      setPost(nextPosts.list);
    }
  };

  const handleWriteBtn = () => {
    router.push("/addArticle");
  };

  useEffect(() => {
    handlePostLoad();
  }, [order]);

  return (
    <div className={styles.container}>
      <header>
        <h2 className={styles.title}>게시글</h2>
        <button className={styles.write_btn} onClick={handleWriteBtn}>
          글쓰기
        </button>
      </header>
      <div className={styles.search}>
        <form className={styles.search_input} onSubmit={handleSearchSubmit}>
          <Image
            className={styles.ic_search}
            src={ic_search}
            alt="돋보기 아이콘"
            width={24}
            height={24}
          />
          <input name="search" placeholder="검색할 상품을 입력해주세요" type="search"/>
        </form>

        <div className={styles.selectOrderBtn}>
          <SelectOrderButton
            handleSelectOption={handleChangeOrder}
            currentOrder={order}
          />
        </div>
      </div>
      <section className={styles.posts}>
        {loadingError && <div>{loadingError.message}</div>}
        {isLoading && posts.length === 0 && <div>로딩 중</div>}
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div key={post.id} ref={lastPostElement}>
                <PostElement key={post.id} post={post} />
              </div>
            );
          }
          return <PostElement key={post.id} post={post} />;
        })}
        {isLoading && posts.length !== 0 && <div>더 가져오는 중</div>}
      </section>
    </div>
  );
};

export default SearchPost;
