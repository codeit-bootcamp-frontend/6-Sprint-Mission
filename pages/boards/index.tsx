import Head from 'next/head';
import BestArticles from '@/components/best-articles';
import Articles from '@/components/articles';
import { axiosInstance } from '@/lib/api/axios';
import { ArticleProps, ArticleList } from '@/types';
import Link from 'next/link';

interface Props {
  articlesServer: ArticleProps[];
  totalCount: number;
}
export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get(`/articles`);
    const getArticlesServer: ArticleList = res.data ?? {};
    const articlesServer: ArticleProps[] = getArticlesServer.list ?? [];
    const totalCount = getArticlesServer.totalCount;

    return {
      props: {
        articlesServer,
        totalCount,
      },
    };
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return {
      props: {
        articlesServer: [],
        totalCount: 0,
      },
    };
  }
}

export default function Boards({ articlesServer, totalCount }: Props) {
  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>
      <div className='overflow-hidden m-auto mt-4 sm:w-[343px] md:w-[696px] md:mt-6 lg:w-[1200px]'>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl font-bold text-cool-gray900'>베스트 게시글</h3>
          <BestArticles />
        </div>
        <div className='flex justify-between mt-[40px] mb-4'>
          <h3 className='text-xl font-bold text-cool-gray900'>게시글</h3>
          <Link href='/addboard'>
            <button className='bg-brand-blue rounded-lg text-white w-[88px] h-[42px] font-semibold'>글쓰기</button>
          </Link>
        </div>
        <Articles articlesServer={articlesServer} totalCount={totalCount} />
      </div>
    </>
  );
}
