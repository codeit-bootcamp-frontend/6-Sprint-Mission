import { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '@/lib/api/axios';
import type { CommentProps } from '@/types';
import { PAGINATION_DEFAULT } from '@/lib/constants';

const { LIMIT } = PAGINATION_DEFAULT;

type UseInfiniteScrollProps = {
  targetId: string;
};

export function useInfiniteScroll({ targetId }: UseInfiniteScrollProps) {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const commentsEnd = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const getComments = async (cursor: string | null = null): Promise<string | null> => {
    const query = `limit=${LIMIT}${cursor ? `&cursor=${cursor}` : ''}`;
    const res = await axiosInstance.get(`/articles/${targetId}/comments?${query}`);
    const nextComments = res.data.list ?? [];
    const nextCursor = res.data.nextCursor ?? null;

    setComments(prevComments => {
      const allComments = [...prevComments, ...nextComments];
      const sortedComments = allComments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const uniqueComments = Array.from(new Set(sortedComments.map(c => c.id))).map(id =>
        sortedComments.find(c => c.id === id)
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

  useEffect(() => {
    const fetchInitialComments = async () => {
      const initialCursor = await getComments();
      setCursor(initialCursor);
    };
    fetchInitialComments();
  }, [targetId]);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !loading && hasMore && cursor !== null) {
        setLoading(true);
        getComments(cursor).then(newCursor => {
          setCursor(newCursor);
          setLoading(false);
        });
      }
    };
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (commentsEnd.current) observer.current.observe(commentsEnd.current);
    return () => observer.current?.disconnect();
  }, [cursor, loading, hasMore]);

  return {
    comments,
    loading,
    commentsEnd,
    hasMore,
    getComments,
  };
}
