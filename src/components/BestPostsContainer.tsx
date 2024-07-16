import React, { useEffect, useState } from 'react';
import BestPosts from './BestPosts';
import { writingType } from '../api/apiType';

const BestPostsContainer = ({ bestPosts }: { bestPosts: writingType[] }) => {
  return <BestPosts posts={bestPosts} />;
};

export default BestPostsContainer;

