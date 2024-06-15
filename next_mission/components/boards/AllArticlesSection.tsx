import { Article, ArticleSortOption } from '@/types/articleTypes';
import Button from '../ui/Button';
import SearchBar from '../ui/SearchBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Empty from '../ui/Empty';
import ArticleItem from './ArticleItem';
import Dropdown from '../ui/Dropdown';

interface AllArticlesSectionProps {
  initialArticles: Article[];
}

const AllArticlesSection: React.FC<AllArticlesSectionProps> = ({
  initialArticles,
}) => {
  const [articles, setArticles] = useState(initialArticles);
  const [orderBy, setOrderBy] = useState('recent');

  const router = useRouter();
  const keyword = (router.query.q as string) || '';

  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
  };

  const handleInputKeyword = (inputKeyword: string) => {
    const query = { ...router.query };
    if (inputKeyword.trim()) {
      query.q = inputKeyword;
    } else {
      delete query.q; // 객체이므로 삭제 가능
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      let url = `https://panda-market-api.vercel.app/articles?orderBy=${orderBy}`;
      if (keyword.trim()) {
        url += `&keyword=${encodeURIComponent(keyword)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setArticles(data.list);
    };

    fetchArticles();
  }, [orderBy, keyword]);

  return (
    <div className="flex flex-col gap-6 w-[1200px] m-auto">
      <div className="flex justify-between">
        <header>게시글</header>
        <Button>글쓰기</Button>
      </div>

      <div className="flex justify-between">
        <SearchBar onSearch={handleInputKeyword} />
        <Dropdown
          onSortSelection={handleSortSelection}
          sortOptions={[
            { key: 'recent', label: '최신순' },
            { key: 'like', label: '인기순' },
          ]}
        />
      </div>

      {articles.length
        ? articles.map((article) => (
            <ArticleItem key={`article-${article.id}`} article={article} />
          ))
        : keyword && <Empty text={`'${keyword}'로 검색된 결과가 없습니다.`} />}
    </div>
  );
};

export default AllArticlesSection;
