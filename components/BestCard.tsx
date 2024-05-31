import Image from 'next/image';
import badge from '@/public/best_badge.png';
import style from './BestCard.module.css';
import { Article } from '@/types/Article.types';

type props = {
  article: Article;
};

export default function BestCard({ article }: props) {
  return (
    <div>
      <div>
        <Image src={badge} alt="best 뱃지" />
      </div>
      <h3>{article.title}</h3>
      <Image src={article.image} alt={`${article.title} 이미지`} />
      <p>{article.writer.nickname}</p>
      <p>{article.likeCount}</p>
      <p>{article.updatedAt ?? article.createdAt}</p>
    </div>
  );
}
