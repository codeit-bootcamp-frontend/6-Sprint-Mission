import { useState, useEffect, useRef } from "react";
import Card from "components/Card";
import SearchForm from "components/SearchForm";
import Post from "components/Post";
import { RectangleButton } from "components/Button";
import TitleContainer from "components/TitleContainer";
import styled from "styled-components";
import { axiosRequester } from "lib/axios";
import useAxiosFetch from "hooks/useAxiosFetch";
import useInterSectionObserver from "hooks/useInterSectionObserver";
import { Article, DataFormat, InitialDataProps } from "types/type";
import useDeviceState, { Device } from "hooks/useDeviceState";
import { AxiosResponse } from "axios";
import Link from "next/link";

const PAGE_SIZE = 5;

export async function getStaticProps() {
  let articles: Article[];
  let totalCount: number;

  try {
    const res: AxiosResponse<DataFormat<Article>> = await axiosRequester({
      method: "get",
      url: "/articles",
      params: {
        page: 1,
        pageSize: 5,
        orderBy: "like",
      },
    });

    articles = res?.data?.list;
    totalCount = res?.data?.totalCount;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialData: articles,
      initialTotalCount: totalCount,
    },
    revalidate: 10,
  };
}

function BestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isLoading, error, axiosFetch } = useAxiosFetch();
  const deviceState = useDeviceState();

  const getArticles = async (pageSize: number) => {
    const res = await axiosFetch<AxiosResponse<DataFormat<Article>>>({
      method: "get",
      url: "articles",
      params: {
        pageSize,
        orderBy: "like",
      },
    });

    setArticles(res?.data?.list);
  };

  useEffect(() => {
    if (!deviceState) return;

    let pageSize;
    if (deviceState === Device.MOBILE) pageSize = 1;
    if (deviceState === Device.TABLET) pageSize = 2;
    if (deviceState === Device.PC) pageSize = 3;

    getArticles(pageSize as number);
  }, [deviceState]);

  return (
    <>
      <Card articles={articles} />
    </>
  );
}

export default function Boards({
  initialData,
  initialTotalCount,
}: InitialDataProps) {
  const [articles, setArticles] = useState<Article[]>(initialData);
  const [articlesPage, setArticlesPage] = useState(2);
  const [totalArticles, setTotalArticles] = useState(initialTotalCount);
  const articlesRef = useRef<HTMLDivElement>(null);
  const isArticlesIntersection = useInterSectionObserver(articlesRef);
  const [orderBy, setOrderBy] = useState("like");
  const { isLoading, error, axiosFetch } = useAxiosFetch();

  const getArticles = async () => {
    const res: AxiosResponse<DataFormat<Article>> = await axiosFetch({
      method: "get",
      url: "articles",
      params: {
        page: articlesPage,
        pageSize: PAGE_SIZE,
        orderBy: orderBy,
      },
    });

    return res;
  };

  useEffect(() => {
    (async () => {
      if (!isArticlesIntersection || articles.length >= totalArticles) return;

      const res = await getArticles();
      setArticles((prev) => [...prev, ...res?.data?.list]);
      setArticlesPage((prev) => prev + 1);
      setTotalArticles(res?.data?.totalCount);
    })();
  }, [isArticlesIntersection]);

  // Sort Data
  const handleSortChange = (newOrderBy: string) => {
    setOrderBy(newOrderBy);
    setArticles([]);
    setArticlesPage(1);
  };

  return (
    <>
      <TitleContainer>
        <Title>베스트 게시글</Title>
      </TitleContainer>
      <ScrollX>
        <CardContainer>
          <BestArticles />
        </CardContainer>
      </ScrollX>
      <TitleContainer>
        <Title>게시글</Title>
        <Link href="/addboard">
          <RectangleButton type="button">글쓰기</RectangleButton>
        </Link>
      </TitleContainer>
      <SearchContainer>
        <SearchForm handleSortChange={handleSortChange} />
      </SearchContainer>
      <Post articles={articles} />
      {isLoading && <Loading>Loading..</Loading>}
      <div ref={articlesRef}></div>
    </>
  );
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  line-height: 2.3rem;
`;

const ScrollX = styled.div`
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const CardContainer = styled.div`
  display: inline-flex;
  gap: 16px;
  margin-bottom: 40px;
`;

const Loading = styled.h1`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colorPalette.primary};
`;

const SearchContainer = styled.div`
  margin-bottom: 24px;
`;
