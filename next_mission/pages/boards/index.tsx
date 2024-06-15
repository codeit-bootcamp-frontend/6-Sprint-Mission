import AllArticlesSection from '@/components/boards/AllArticlesSection';
import BestArticlesSection from '@/components/boards/BestArticlesSection';
import { Article, ArticleListData } from '@/types/articleTypes';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://panda-market-api.vercel.app/articles?orderBy=recent`
  );
  const data: ArticleListData = await res.json();

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
    <div className="flex flex-col p-4 gap-10">
      <BestArticlesSection />
      <AllArticlesSection initialArticles={initialArticles} />
    </div>
  );
}
