import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import type { ArticleProps } from '@/types';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import icBack from '@/public/images/icons/ic_back.svg';
import CommentInput from '@/components/comment-input';
import CommentList from '@/components/comment-list';
import ArticleDetail from '@/components/article-detail';
import { axiosInstance, baseURL } from '@/lib/api/axios';
import axios from 'axios';
import { postLike, deleteLike } from '@/lib/api/like';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

type Props = {
  article: ArticleProps | null;
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const { id } = context.params as { id: string };
  let article: ArticleProps | null = null;

  try {
    const res = await axios.get(`${baseURL}articles/${id}`);
    article = res.data ?? null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
  }

  return {
    props: {
      article,
    },
  };
}

export default function Article({ article }: Props) {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { comments, loading, commentsEnd, getComments } = useInfiniteScroll({ targetId: id });
  const [isLiked, setIsLiked] = useState(article?.isLiked);

  const handleNewComment = async () => {
    await getComments();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`${baseURL}articles/${id}`);
        if (res.data.isLiked === true) setIsLiked(true);
      } catch (error: any) {
        if (error.response) {
          console.error('Response error:', error.response);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('General error:', error.message);
        }
      }
    };
    fetchData();
  }, [isLiked]);

  const handleToggleLike = async () => {
    if (isLiked === false) {
      await postLike(parseInt(id));
      setIsLiked(prev => !prev);
    } else {
      await deleteLike(parseInt(id));
      setIsLiked(prev => !prev);
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!article) return null;

  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>
      <div className='flex-col gap-4 m-auto mb-16 w-[343px] md:w-[696px] lg:w-[1200px] pt-6 min-h-[730px]'>
        <ArticleDetail {...article} onClick={handleToggleLike} />
        <CommentInput id={id} onNewComment={handleNewComment} />
        <CommentList comments={comments} />
        <div ref={commentsEnd} />
        {loading && <div>Loading...</div>}
        <Link href='/boards'>
          <button className='m-auto bg-brand-blue w-[240px] flex justify-between rounded-[40px] px-[40px] py-3 text-white'>
            목록으로 돌아가기
            <Image src={icBack} width={24} alt='뒤로가기 아이콘' />
          </button>
        </Link>
      </div>
    </>
  );
}
