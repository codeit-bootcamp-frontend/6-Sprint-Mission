import BestPostsContainer from '@/src/components/BestPostsContainer';
import TotalPosts from '@/src/components/TotalPosts';
import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/BoardFrame.module.css';
import { GetServerSideProps } from 'next';
import { AxiosError } from 'axios';
import { getBestPosts } from '@/src/api/api';
import { writingType } from '@/src/api/apiType';
interface bestPosts {
  bestPosts: writingType[];
}

const boards: React.FC<bestPosts> = ({ bestPosts }) => {
  return (
    <div className={style.boardFrame}>
      <BestPostsContainer bestPosts={bestPosts} />
      <TotalPosts />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<bestPosts> = async () => {
  const URL = `page=1&pageSize=3&orderBy=like`;
  try {
    const bestPosts = await getBestPosts(URL);
    return {
      props: { bestPosts },
    };
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export default boards;

