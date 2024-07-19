'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { List } from '@/app/apis/getArticle';
import heartIcon from '@/app/assets/images/ic_heart.svg';
import profileIcon from '@/app/assets/images/ic_profile.png';
import searchIcon from '@/app/assets/images/ic_search.png';
import { formatDate } from '@/app/utils/formateDate';

import styles from './SearchTitle.module.css';

interface Props {
  articles: List[];
  keyword: string;
  page: number;
  pageSize: number;
  orderBy: string;
  totalCount: number;
}

export default function SearchTitle({
  articles,
  keyword,
  page,
  pageSize,
  orderBy,
  totalCount,
}: Props) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(orderBy);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSortBy(orderBy);
  }, [orderBy]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('pageSize', String(pageSize));
      params.append('keyword', searchKeyword);
      params.append('orderBy', sortBy);

      const newUrl = `/boards?${params.toString()}`;
      router.push(newUrl);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchKeyword, pageSize, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setIsDropdownOpen(false);

    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('pageSize', String(pageSize));
    params.append('keyword', searchKeyword);
    params.append('orderBy', newSortBy);

    const newUrl = `/boards?${params.toString()}`;
    router.push(newUrl);
  };

  const handleArticleClick = (articleId: number) => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('pageSize', String(pageSize));
    params.append('keyword', searchKeyword);
    params.append('orderBy', sortBy);

    const newUrl = `/boards/${articleId}?${params.toString()}`;
    router.push(newUrl);
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const pageRange = 5;
  const startPage = Math.max(1, page - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.append('page', String(newPage));
    params.append('pageSize', String(pageSize));
    params.append('keyword', searchKeyword);
    params.append('orderBy', sortBy);

    const newUrl = `/boards?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="검색할상품을 입력하세요"
          value={searchKeyword}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <div className={styles.sortDropdown}>
          <div
            className={styles.sortDropdownToggle}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortBy === 'recent' ? '최신순' : '좋아요순'}
            <span className={styles.sortDropdownIcon}>▼</span>
          </div>
          {isDropdownOpen && (
            <ul className={styles.sortDropdownMenu}>
              <li onClick={() => handleSortChange('recent')}>최신순</li>
              <li onClick={() => handleSortChange('like')}>좋아요순</li>
            </ul>
          )}
        </div>
      </div>
      <ul className={styles.articleList}>
        {articles.map((article) => (
          <li
            key={article.id}
            className={styles.articleItem}
            onClick={() => handleArticleClick(article.id)}
          >
            <div className={styles.articleContent}>
              <div className={styles.articleItemsWrapper}>
                <div className={styles.articleTitle}>{article.title}</div>
                {article.image && (
                  <div className={styles.articleImage}>
                    <Image
                      src={article.image}
                      width={72}
                      height={72}
                      alt="article thumbnail"
                    />
                  </div>
                )}
              </div>
              <div className={styles.articleInfo}>
                <div className={styles.articleWriterWrapper}>
                  <Image
                    src={profileIcon}
                    width={16}
                    height={16}
                    alt="프로필"
                  />
                  <span className={styles.articleWriter}>
                    {article.writer.nickname}
                  </span>
                  <span className={styles.articleDate}>
                    {formatDate(article.createdAt)}
                  </span>
                </div>
                <span className={styles.articleLike}>
                  <Image
                    src={heartIcon}
                    width={16}
                    height={16}
                    alt="하트아이콘"
                  />
                  {article.likeCount}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button
          className={`${styles.paginationButton} ${styles.prev} ${
            startPage === 1 ? styles.disabled : ''
          }`}
          onClick={() => handlePageChange(startPage - 1)}
          disabled={startPage === 1}
        >
          {'<'}
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${styles.paginationButton} ${
              page === pageNumber ? styles.active : ''
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`${styles.paginationButton} ${styles.next} ${
            endPage === totalPages ? styles.disabled : ''
          }`}
          onClick={() => handlePageChange(endPage + 1)}
          disabled={endPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
