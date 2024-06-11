import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { constants } from '@/lib/constants';
import { ArticleProps, CommentProps } from '@/types';
import axiosInstance from '@/lib/api/axios';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import icBack from '@/public/images/icons/ic_back.svg';
import CommentInput from '@/components/comment-input';
import CommentList from '@/components/comment-list';
import ArticleDetail from '@/components/article-detail';

type Props = {
  article: ArticleProps | null;
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const { id } = context.params as { id: string };
  let article: ArticleProps | null = null;

  try {
    const res = await axiosInstance.get(`/articles/${id}`);
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
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const commentsEnd = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const getComments = async (targetId: string[] | string, cursor: string | null = null): Promise<string | null> => {
    const query = `limit=${constants.LIMIT}${cursor ? `&cursor=${cursor}` : ''}`;
    const res = await axiosInstance.get(`/articles/${targetId}/comments?${query}`);
    const nextComments = res.data.list ?? [];
    const nextCursor = res.data.nextCursor ?? null;

    setComments(prevComments => {
      const allComments = [...prevComments, ...nextComments];
      const uniqueComments = Array.from(new Set(allComments.map(c => c.id))).map(id =>
        allComments.find(c => c.id === id)
      );
      return uniqueComments;
    });

    if (nextCursor === null) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    return nextCursor;
  };

  const handleNewComment = async () => {
    const newCursor = await getComments(id);
    setCursor(newCursor);
  };

  useEffect(() => {
    if (!id) return;
    const fetchInitialComments = async () => {
      const initialCursor = await getComments(id);
      setCursor(initialCursor);
    };
    fetchInitialComments();
  }, [id]);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !loading && hasMore && cursor !== null) {
        setLoading(true);
        getComments(id, cursor).then(newCursor => {
          setCursor(newCursor);
          setLoading(false);
        });
      }
    };

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (commentsEnd.current) observer.current.observe(commentsEnd.current);

    return () => observer.current?.disconnect();
  }, [id, cursor, loading, hasMore]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!article) return null;

  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>
      <div className='flex-col gap-4 m-auto w-[343px] md:w-[696px] lg:w-[1200px] pt-6 min-h-[730px]'>
        <ArticleDetail {...article} />
        <CommentInput id={id} onNewComment={handleNewComment} />
        <CommentList comments={comments} />
        <div ref={commentsEnd} />
        {loading && <div>Loading...</div>}
        <Link href='/boards'>
          <button className='m-auto mb-20 bg-brand-blue w-[240px] flex justify-between rounded-[40px] px-[40px] py-3 text-white'>
            목록으로 돌아가기
            <Image src={icBack} width={24} alt='뒤로가기 아이콘' />
          </button>
        </Link>
      </div>
    </>
  );
}
