import { GetServerSidePropsContext } from 'next';
import Post from "components/Post";
import { axiosRequester } from "lib/axios";
import styled from "styled-components";
import { Article, SearchProps } from "types/type";
import { AxiosResponse } from 'axios';
import { DataFormat } from 'types/type';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const keyword = context.query.keyword;
  let articles: Article[];
  
  try {
    const res: AxiosResponse<DataFormat<Article>> = await axiosRequester ({
      method: "get",
      url: "/articles",
      params: {
        keyword,
      },
    });

    articles = res?.data?.list;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      keyword,
      articles
    }
  }
}

export default function Search({ keyword, articles }: SearchProps) {

  return (
    <>
      <Title>'{keyword}' 검색 결과</Title>
      <Post articles={articles} />
    </>
  );
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2.3rem;
  margin: 24px 0;
`;
