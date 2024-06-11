import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { IArticle, ILoadArticlesParams } from '@/interface/interface';
import { loadArticles } from '@/pages/api/apis';

import Button from '@/components/Button';
import BestArticleItem from '@/components/BestArticleItem';
import ArticleListItem from '@/components/ArticlesListItem';
import Container from '@/components/Container';
import FilterBox from '@/components/FilterBox';

import ICON_MAGNIFY from '@/public/icon-magnify.svg';

type TDisplaySize = 'desktop' | 'tablet' | 'mobile';

export default function Board() {
  const router = useRouter();

  const [articles, setArticles] = useState<IArticle[]>([]);
  const [bestArticles, setBestArticles] = useState<IArticle[]>([]);
  const [params, setParams] = useState<ILoadArticlesParams>({
    page: 1,
    pageSize: 99,
    orderBy: 'recent',
    keyword: '',
  });

  const [displaySize, setDisplaySize] = useState<TDisplaySize>();

  const fetchArticles = async () => {
    const articleList = await loadArticles(params);
    setArticles(articleList || []);
  };

  const fetchBestArticles = async (pageSize: number) => {
    const BestArticleList = await loadArticles({
      pageSize,
      orderBy: 'like',
    });
    setBestArticles(BestArticleList || []);
  };

  function paramsHandler(
    key: keyof ILoadArticlesParams,
    value: string | number,
  ) {
    setParams((prevParams) => ({ ...prevParams, [key]: value }));
  }

  function getResponseBestArticleSize(
    displaySize: TDisplaySize | undefined,
  ): number {
    let articlesToDisplay;
    switch (displaySize) {
      case 'desktop':
        articlesToDisplay = 3;
        break;
      case 'tablet':
        articlesToDisplay = 2;
        break;
      default:
        articlesToDisplay = 1;
    }
    return articlesToDisplay;
  }

  useEffect(() => {
    function getDisplaySize() {
      const width = window.innerWidth;
      if (width < 768) {
        return 'mobile';
      } else if (width < 1200) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    }

    function handleResize() {
      setDisplaySize(getDisplaySize());
      fetchBestArticles(getResponseBestArticleSize(getDisplaySize()));
    }

    let debounceTimer: ReturnType<typeof setTimeout>;

    function debounceHandleResize() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(handleResize, 100); // 100ms의 디바운스 타임
    }

    fetchBestArticles(getResponseBestArticleSize(getDisplaySize()));
    setDisplaySize(getDisplaySize());

    window.addEventListener('resize', debounceHandleResize);

    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [params.orderBy]);

  return (
    <>
      <Head>
        <title>판다마켓 - 자유게시판</title>
      </Head>
      <div className="flex items-center justify-center">
        <Container>
          <section className="w-[100%]">
            <h1 className="font-bold text-[20px] mb-[20px]">베스트 게시글</h1>
            <div className="w-[100%] flex justify-around md:gap-[10px] mb-[30px] overflow-x-hidden">
              {bestArticles?.map((article) => (
                <BestArticleItem
                  key={`BestArticle-${article.id}`}
                  article={article}
                />
              ))}
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between mb-[20px]">
              <h1 className="font-bold text-[20px]">게시글</h1>
              <div className="w-[88px] h-[42px] rounded-lg overflow-hidden">
                <Button
                  onClick={() => {
                    router.push('/addboard');
                  }}
                >
                  글쓰기
                </Button>
              </div>
            </div>
            <div className="flex justify-between gap-[15px] h-[42px]">
              <div className="relative flex-1">
                <input
                  className="w-[100%] h-[100%] pl-[35px] bg-[#f3f4f6] rounded-xl"
                  type="text"
                  value={params.keyword}
                  onChange={(e) => {
                    paramsHandler('keyword', e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      fetchArticles();
                    }
                  }}
                  placeholder="검색할 상품을 입력해주세요"
                />
                <Image
                  className="absolute top-[13px] left-[10px]"
                  src={ICON_MAGNIFY}
                  alt="검색 아이콘 이미지"
                />
              </div>
              <FilterBox
                orderBy={params.orderBy || 'recent'}
                paramsHandler={paramsHandler}
                displaySize={displaySize || 'desktop'}
              />
            </div>
            <div>
              {articles?.map((article) => (
                <Link
                  key={`article-Link-${article.id}`}
                  href={`board/${article.id}`}
                >
                  <ArticleListItem article={article} />
                </Link>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
