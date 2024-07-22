import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import type { ArticleProps } from '@/types';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import icBack from '@/public/images/icons/ic_back.svg';
import CommentInput from '@/components/comment-input';
import CommentList from '@/components/comment-list';
import ArticleDetail from '@/components/article-detail';
import { baseURL } from '@/lib/api/axios';
import axios from 'axios';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLike, postLike, LikeResponse, ErrorMessage } from '@/lib/api/like';

type Props = {
  serverArticle: ArticleProps | null;
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const { id } = context.params as { id: string };
  let article: ArticleProps | null = null;

  try {
    const res = await axios.get(`${baseURL}articles/${id}`);
    article = res.data ?? null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      serverArticle: article,
    },
  };
}

export default function Article({ serverArticle }: Props) {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

  const router = useRouter();
  const { id } = router.query as { id?: string };
  const queryClient = useQueryClient();

  if (!id) return null;

  const { comments, loading, commentsEnd, getComments } = useInfiniteScroll({ targetId: id });

  const { data: article, refetch } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}articles/${id}`);
      return response.data;
    },
    initialData: serverArticle,
    refetchOnWindowFocus: false,
  });
  const likeMutation = useMutation<LikeResponse, Error, { userAction: 'like' | 'unlike' }>({
    mutationFn: async ({ userAction }) => {
      let response: LikeResponse | ErrorMessage;
      if (userAction === 'like') {
        response = await postLike(id, token);
      } else {
        response = await deleteLike(id, token);
      }
      if ('message' in response) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: data => {
      queryClient.setQueryData(['article', id], data);
    },
    onError: error => {
      console.error('Like operation failed:', error);
    },
  });

  const handleLikeButtonClick = () => {
    const userAction = article?.isLiked ? 'unlike' : 'like';
    likeMutation.mutate({ userAction });
  };

  const handleNewComment = async () => {
    await getComments();
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
        <ArticleDetail {...article} articleId={id} onLike={handleLikeButtonClick} />
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
