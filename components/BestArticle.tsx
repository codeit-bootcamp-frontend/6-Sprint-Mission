import styled from "styled-components";
import React from "react";
import Badge from "@/images/img_badge.svg";
import Heart from "@/images/heart.svg";
import { format } from "date-fns";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: number;
    nickname: string;
  };
}

interface BestArticleProps {
  articles: Article[];
  visibleArticlesCount: number;
}
export default function BestArticle({
  articles,
  visibleArticlesCount,
}: BestArticleProps) {
  const sortedArticles = articles.sort((a, b) => b.likeCount - a.likeCount);
  const topArticles = sortedArticles.slice(0, visibleArticlesCount);

  return (
    <>
      {topArticles.map((article) => (
        <div key={article.id}>
          <Link href={`/addboard/${article.id}`}>
            <Container>
              <Badge />
              <Content>
                <Text>{article.title}</Text>
                {article.image ? (
                  <StyledImage src={article.image} alt="이미지" />
                ) : (
                  <></>
                )}
              </Content>
              <InfoContent>
                <GrayText>{article.writer.nickname}</GrayText>
                <Heart />
                <GrayText>{article.likeCount}</GrayText>
                <CreateAt>{format(article.createdAt, "yyyy. MM. dd")}</CreateAt>
              </InfoContent>
            </Container>
          </Link>
        </div>
      ))}
    </>
  );
}

const Container = styled.div`
  width: 384px;
  height: 169px;
  background: #f9fafb;
  border-radius: 8px;
  position: relative;
  padding: 0 30px;
  @media (max-width: 1199px) {
    width: 340px;
  }
`;
const Content = styled.div`
  display: flex;
  margin: 10px 0;
  gap: 10px;
  max-height: 70px;
  overflow: hidden;
`;
const InfoContent = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: 10px;
`;
const Text = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #1f2937;
`;
const StyledImage = styled.img`
  box-sizing: border-box;
  margin: 0 0 0 auto;
  width: 72px;
  height: 72px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  object-fit: cover; /* 이미지를 적절하게 채우는 스타일 */
`;
const GrayText = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4b5563;
`;
const CreateAt = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #9ca3af;
  margin: 0 0 0 auto;
`;
