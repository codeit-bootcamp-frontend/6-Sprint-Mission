import { Article } from '@/types/Article.types';
import BestCard from './BestCard';
import Link from 'next/link';

type props = {
  articles: Article[];
};

export default function BestCardList({ articles }: props) {
  return (
    <ul>
      {articles?.map((article) => (
        <li key={article.id}>
          <Link href={`/articles/${article.id}`}>
            <BestCard article={article} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
