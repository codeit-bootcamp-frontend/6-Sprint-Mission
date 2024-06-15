import { useEffect, useState } from 'react';
import BestArticleCard from './BestArticleCard';
import { Article, ArticleListData } from '@/types/articleTypes';
import useViewport from '@/hooks/useViewport';

const getPageSize = (width: number): number => {
  if (width < 768) {
    return 1; // Mobile
  } else if (width < 1280) {
    return 2; // Tablet
  } else {
    return 3; // Desktop
  }
};

const BestArticlesSection = () => {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);

  const viewportWidth = useViewport();

  useEffect(() => {
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);

    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);

      const fetchBestArticles = async (size: number) => {
        try {
          const res = await fetch(
            `https://panda-market-api.vercel.app/articles?orderBy=like&pageSize=${size}`
          );
          const data: ArticleListData = await res.json();
          setBestArticles(data.list);
        } catch (error) {
          console.error('베스트 게시물을 받아오는 데 실패했습니다.', error);
        }
      };

      fetchBestArticles(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  return (
    <div className="flex flex-col m-auto gap-6 w-[1200px]">
      <header className="font-bold text-xl text-[#111827]">
        베스트 게시글
      </header>

      <div className="flex justify-between">
        {bestArticles.map((article) => (
          <BestArticleCard
            key={`best-article-${article.id}`}
            article={article}
          />
        ))}
      </div>
    </div>
  );
};

export default BestArticlesSection;
