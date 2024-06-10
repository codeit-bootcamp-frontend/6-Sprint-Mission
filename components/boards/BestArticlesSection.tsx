import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  FlexRowCentered,
  SectionHeader,
  SectionTitle,
} from "@/styles/CommonStyles";
import { Article, ArticleListResponse } from "@/types/articleTypes";
import {
  ArticleInfo,
  ArticleInfoDiv,
  ArticleThumbnail,
  ArticleTitle,
  ImageWrapper,
  MainContent,
  Timestamp,
} from "@/styles/BoardsStyles";
import MedalIcon from "@/public/images/icons/ic_medal.svg";
import useViewport from "@/hooks/useViewport";
import LikeCountDisplay from "@/components/ui/LikeCountDisplay";

const CardContainer = styled(Link)`
  background-color: var(--gray-50);
  border-radius: 8px;
`;

const ContentWrapper = styled.div`
  padding: 16px 24px;
`;

const BestSticker = styled(FlexRowCentered)`
  background-color: var(--blue);
  border-radius: 0 0 32px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  gap: 4px;
  padding: 6px 24px 8px 24px;
  margin-left: 24px;
  display: inline-flex;
`;

const BestArticleCard = ({ article }: { article: Article }) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");

  return (
    <CardContainer href={`/boards/${article.id}`}>
      <BestSticker>
        <MedalIcon />
        Best
      </BestSticker>

      <ContentWrapper>
        <MainContent>
          <ArticleTitle>{article.title}</ArticleTitle>
          {article.image && (
            <ArticleThumbnail>
              <ImageWrapper>
                <Image
                  fill
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                />
              </ImageWrapper>
            </ArticleThumbnail>
          )}
        </MainContent>

        <ArticleInfo>
          <ArticleInfoDiv>
            {article.writer.nickname}
            <LikeCountDisplay count={article.likeCount} fontSize={14} />
          </ArticleInfoDiv>
          <Timestamp>{dateString}</Timestamp>
        </ArticleInfo>
      </ContentWrapper>
    </CardContainer>
  );
};

const BestArticlesCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

const getPageSize = (width: number): number => {
  if (width < 768) {
    return 1; // Mobile viewport
  } else if (width < 1280) {
    return 2; // Tablet viewport
  } else {
    return 3; // Desktop viewport
  }
};

const BestArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const viewportWidth = useViewport();

  useEffect(() => {
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);

    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);

      const fetchBestArticles = async (size: number) => {
        try {
          const response = await fetch(
            `https://panda-market-api.vercel.app/articles?orderBy=like&pageSize=${size}`
          );
          const data: ArticleListResponse = await response.json();
          setArticles(data.list);
        } catch (error) {
          console.error("Failed to fetch best articles:", error);
        }
      };

      fetchBestArticles(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  return (
    <div>
      <SectionHeader>
        <SectionTitle>베스트 게시글</SectionTitle>
      </SectionHeader>

      <BestArticlesCardSection>
        {articles.map((article) => (
          <BestArticleCard
            key={`best-article-${article.id}`}
            article={article}
          />
        ))}
      </BestArticlesCardSection>
    </div>
  );
};

export default BestArticlesSection;
