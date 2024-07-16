import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { getTotalPosts } from '../api/api';
import { writingType } from '../api/apiType';
import Post from './Post';
import { AxiosError } from 'axios';
import style from '@/styles/Post.module.css';
import useInfiniteScroll from '../hook/useInfiniteScroll';

const TotalPostsContainer = () => {
  const router = useRouter();
  const { orderBy, keyword } = router.query;
  const [posts, setPosts] = useState<writingType[]>([]);
  const { scrollRef, limit } = useInfiniteScroll();

  const getPosts = async () => {
    if (keyword && orderBy) {
      try {
        const result = await getTotalPosts(
          `page=1&pageSize=${limit}&orderBy=${orderBy}&keyword=${keyword}`
        );
        setPosts(result);
      } catch (error) {
        const err = error as AxiosError;
      }
      return;
    }

    try {
      const result = await getTotalPosts(
        `page=1&pageSize=${limit}&orderBy=${orderBy}`
      );
      setPosts(result);
    } catch (error) {
      const err = error as AxiosError;
    }
  };

  const onClickHandler = (id: number) => {
    router.push(`/board/${id}`);
  };

  useEffect(() => {
    getPosts();
  }, [router.query, limit]);

  return (
    <>
      {posts.map((element) => (
        <Post
          onClickHandler={onClickHandler}
          key={element.id}
          id={element.id}
          image={element.image}
          content={element.title}
          likeCount={element.likeCount}
          nickName={element.writer.nickname}
          createdAt={element.createdAt}
        />
      ))}
      <div className={style['observer']} ref={scrollRef} />
    </>
  );
};

export default TotalPostsContainer;

