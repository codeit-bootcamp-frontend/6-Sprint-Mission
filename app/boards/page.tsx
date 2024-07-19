import Link from 'next/link';

import { BASE_URL, List, RootObject } from '@/app/apis/getArticle';
import styles from '@/app/boards/BoardPage.module.css';
import BestList from '@/components/Board/BestList';
import SearchTitle from '@/components/Board/SearchTitle';

interface Props {
  searchParams?: {
    page?: string;
    pageSize?: string;
    orderBy?: string;
    keyword?: string;
  };
}

export default async function BoardPage({ searchParams }: Props) {
  const page = parseInt(searchParams?.page || '1');
  const pageSize = parseInt(searchParams?.pageSize || '10');
  const orderBy = searchParams?.orderBy || 'recent';
  const keyword = searchParams?.keyword || '';

  const [articlesRes, bestListRes] = await Promise.all([
    fetch(
      `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`,
      { cache: 'no-store' },
    ),
    fetch(`${BASE_URL}/articles?page=1&pageSize=3&orderBy=like`, {
      cache: 'no-store',
    }),
  ]);

  const [articlesData, bestListData] = await Promise.all([
    articlesRes.json(),
    bestListRes.json(),
  ]);

  const articles: List[] = (articlesData as RootObject).list;
  const bestList: List[] = (bestListData as RootObject).list;
  const totalCount: number = (articlesData as RootObject).totalCount;

  return (
    <div className={styles.bestPageContainer}>
      <div className={styles.bestBoardTitle}>베스트 게시글</div>
      <div>
        <BestList bestList={bestList} />
      </div>
      <div className={styles.boardListContainer}>
        <div className={styles.boardListTitle}>게시글</div>
        <Link href="/boards/post" className={styles.writeButton}>
          글쓰기
        </Link>
      </div>
      <SearchTitle
        articles={articles}
        keyword={keyword}
        page={page}
        pageSize={pageSize}
        orderBy={orderBy}
        totalCount={totalCount}
      />
    </div>
  );
}
