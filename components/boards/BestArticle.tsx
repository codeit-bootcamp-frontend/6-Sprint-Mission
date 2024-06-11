import { Article, ArticleListResponse } from "@/@types/api";
import ArticleCard from "@/components/boards/ArticleCard";

export default function BestArticle({ articles }: { articles: Article[] }) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">베스트 게시글</h1>
      <div className="flex gap-5">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
