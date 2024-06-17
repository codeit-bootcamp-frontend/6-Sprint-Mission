import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getTotalPosts } from '../api/api';
import { writingType } from '../api/apiType';
import Post from './Post';
import { AxiosError } from 'axios';
export const URL = `page=1&pageSize=5`;
const TotalPostsContainer = () => {
  const router = useRouter();
  const { orderBy, keyword } = router.query;

  const [posts, setPosts] = useState<writingType[]>([]);
  const getPosts = async () => {
    if (orderBy) {
      try {
        const result = await getTotalPosts(`${URL}&orderBy=${orderBy}`);
        setPosts(result);
      } catch (error) {
        const err = error as AxiosError;
      }
    } else if (keyword) {
      try {
        const result = await getTotalPosts(`${URL}&keyword=${keyword}`);
        setPosts(result);
      } catch (error) {
        const err = error as AxiosError;
      }
    }
  };
  useEffect(() => {
    getPosts();
  }, [orderBy, keyword]);
  return (
    <>
      {posts.map((element) => (
        <Post
          key={element.id}
          image={element.image}
          content={element.title}
          likeCount={element.likeCount}
          nickName={element.writer.nickname}
          createdAt={element.createdAt}
        />
      ))}
    </>
  );
};

export default TotalPostsContainer;

