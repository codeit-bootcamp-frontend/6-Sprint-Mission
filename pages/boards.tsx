import React, { useEffect, useState } from "react";
import BoardNavBar from "@/components/BoardNavBar";
import styles from "@/styles/Board.module.css";
import Article from "@/components/Article";
import BestArticle from "@/components/BestArticle";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { getArticles, getBestArticles, ArticleResponse, OrderQuery } from "@/lib/apis/getArticle.api";
import useMediaQuery from "@/hooks/useMatchMedia";
import Link from "next/link";
import PageButton from "@/components/PageButton";

export interface QueryOption {
  orderBy?: string | string[];
  keyword?: string | string[];
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const res = await getArticles({});
    const articles = res.list ?? [];
    const totalCount = res.totalCount;
    return {
      props: {
        articles,
        totalCount,
      },
      revalidate: 10, // Revalidate the page every 10 seconds (if needed)
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

type Articles = {
  articles: ArticleResponse[];
  totalCount: number;
};

const Board = ({ articles, totalCount }: Articles) => {
  const [bestArticles, setBestArticles] = useState<ArticleResponse[]>([]);
  const [pageSize, setPageSize] = useState<number>(3);
  const [articleList, setArticleList] = useState<ArticleResponse[]>(articles);
  const [orderQuery, setOrderQuery] = useState({});
  const [page, setPage] = useState(1);

  const isSmallScreen = useMediaQuery("(min-width: 380px) and (max-width: 767px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");

  const handlePage = (value: number) => {
    setPage(value);
    setOrderQuery((prevOrderQuery) => ({
      ...prevOrderQuery,
      page: value,
    }));
  };

  const handleOrderBy = (value: string) => {
    setOrderQuery((prevOrderQuery) => ({
      ...prevOrderQuery,
      orderBy: value,
      page: 1,
    }));
    setPage(1);
  };

  const handleKeyword = (value: string) => {
    setOrderQuery((prevOrderQuery) => ({
      ...prevOrderQuery,
      keyword: value,
      page: 1,
    }));
    setPage(1);
  };

  useEffect(() => {
    const getArticleList = async (orderQuery: OrderQuery) => {
      const { list } = await getArticles(orderQuery);
      setArticleList(list);
    };

    getArticleList(orderQuery);
  }, [orderQuery]);

  useEffect(() => {
    if (isLargeScreen) {
      setPageSize(3);
    } else if (isMediumScreen) {
      setPageSize(2);
    } else if (isSmallScreen) {
      setPageSize(1);
    }
  }, [isLargeScreen, isMediumScreen, isSmallScreen]);

  useEffect(() => {
    const getBestArticleList = async (option: number) => {
      const { list } = await getBestArticles(option);
      setBestArticles(list);
    };
    getBestArticleList(pageSize);
  }, [pageSize]);

  return (
    <>
      <Head>
        <title>자유게시판</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles["article-top-text"]}>베스트 게시글</h2>
        <section className={styles["best-article-list"]}>
          {bestArticles.map((article) => {
            return (
              <Link href={`/boards/${article.id}`} key={article.id}>
                <BestArticle {...article} />
              </Link>
            );
          })}
        </section>
        <BoardNavBar handleOrderBy={handleOrderBy} handleKeyword={handleKeyword} />
        <section className={styles["all-article-list"]}>
          {articleList.map((article) => {
            return (
              <Link href={`/boards/${article.id}`} key={article.id}>
                <Article {...article} />
              </Link>
            );
          })}
        </section>
        <PageButton totalCount={totalCount} handlePage={handlePage} page={page} />
      </div>
    </>
  );
};

export default Board;
