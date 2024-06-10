import styled from "styled-components";
import React from "react";
import Heart from "@/images/heart.svg";
import ProfileImg from "@/images/ic_profile.png";
import Image from "next/image";
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

interface ArticleProps {
  articles: Article[];
}
export default function Article({ articles }: ArticleProps) {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <Link href={`/addboard/${article.id}`}>
            <Container>
              <div style={{ display: "flex" }}>
                <Content>{article.title}</Content>
                {article.image ? (
                  <StyledImage src={article.image} alt="이미지" />
                ) : (
                  <></>
                )}
              </div>
              <div style={{ display: "flex" }}>
                <Group>
                  <Image src={ProfileImg} alt="프로필 이미지" />
                  <GrayText>{article.writer.nickname}</GrayText>
                  <CreateAt>
                    {format(article.createdAt, "yyyy. MM. dd")}
                  </CreateAt>
                </Group>
                <HeartGroup>
                  <Heart />
                  <GrayText>{article.likeCount}</GrayText>
                </HeartGroup>
              </div>
            </Container>
            <Divider />
          </Link>
        </div>
      ))}
    </div>
  );
}
const Container = styled.div`
  margin: 20px auto;
  width: 1200px;
  @media (max-width: 1199px) {
    width: 696px;
  }
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const Content = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #1f2937;
  width: 1120px;
  min-height: 112px;
  padding: 20px 0;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 16px 0;
`;
const StyledImage = styled.img`
  box-sizing: border-box;
  margin: 20px 0 20px auto;
  width: 72px;
  height: 72px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  object-fit: cover;
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
`;
const Group = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const HeartGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 0 0 auto;
`;
