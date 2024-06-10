import React from 'react';
import { useState, useEffect } from 'react';
import BestPosts from '../../components/BestPosts';
import AllPosts from '../../components/AllPosts';
import axios from '../../lib/axios';
import Image from 'next/image';
import styles from './index.module.css'
import {Post} from "@/type/type";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePostsCount, setVisiblePostsCount] = useState(3);
  const [order, setOrder] = useState('recent');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const sortedArticles = posts ? [...posts].sort((a, b) => b.likeCount - a.likeCount) : [];
  const topArticles = sortedArticles.slice(0, visiblePostsCount);

  async function getPosts() {
    try {
      const res = await axios.get(`/articles`);
      const nextPosts: Post[] = res.data.results;
      setPosts(nextPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisiblePostsCount(1);
      } else if (window.innerWidth < 1200) {
        setVisiblePostsCount(2);
      } else {
        setVisiblePostsCount(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOrderChange = (selectedOrder: string) => {
    setOrder(selectedOrder);
    setIsOpen(false);
  };

  const filteredPosts = posts
    ?.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (order === 'recent') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return b.likeCount - a.likeCount;
      }
    });

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>베스트 게시글</h2>
        <div className={styles.BestPosts}>
          {topArticles.map((post) => {
            return <BestPosts key={post.id} post={post} />;
          })}
        </div>
      </div>
      <div className={styles.postNav}>
        <h2 className={styles.title}>게시글</h2>
        <div>
          <button className={styles.addBtn}>글쓰기</button>
        </div>
      </div>
      <div className={styles.postNav}>
        <div className={styles.search}>
          <Image
            src="/Img/search.png"
            width={24}
            height={24}
            alt="search"
            className={styles.searchImg}
          />
          <input
            className={styles.searchBar}
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <div
            className={styles.selectButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={styles.Order}>
              {order === "recent" ? "최신순" : "좋아요순"}
              </div>
              <div>
              ▼
              </div>
              </div>
              </div>
              </div>
              {isOpen ? (
        <div className={styles.OptionsContainer}>
          <div
            onClick={() => handleOrderChange("recent")}
            className={styles.Option}
          >
            최신순
          </div>
          <div
            onClick={() => handleOrderChange("like")}
            className={styles.Option}
          >
            좋아요순
          </div>
        </div>
      ) : (
        <></>
      )}
      {(filteredPosts || []).map((post) => (
        <AllPosts key={post.id} post={post} />
      ))}
    </div>
  );
}
