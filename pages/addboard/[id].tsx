import React from "react";
import styled from "styled-components";
import { Container } from "@/styles/CommonStyles";
import { GetStaticProps } from "next";
import { Article, ArticleListResponse } from "@/types/articleTypes";
import BoardProfileSection from "@/components/addBoard/BoardProfileSection";
import BoardCommentSection from "@/components/addBoard/BoardCommentSection";
import BoardCommentThread from "@/components/addBoard/BoardCommentThread";

const PageContainer = styled(Container)`
  gap: 40px;
  display: flex;
  flex-direction: column;
`;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `https://panda-market-api.vercel.app/articles?orderBy=recent`
  );
  const data: ArticleListResponse = await response.json();

  return {
    props: {
      initialArticles: data.list,
    },
  };
};

interface BoardsPageProps {
  initialArticles: Article[];
}

export default function BoardsPage({ initialArticles }: BoardsPageProps) {
  return (
    <PageContainer>
      {initialArticles.map((article) => (
        <div key={article.id}>
          <BoardProfileSection article={article} />
          <BoardCommentSection articleId={article.id} />
          <BoardCommentThread articleId={article.id} />
          <hr />
        </div>
      ))}
    </PageContainer>
  );
}
