'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

import styles from './SearchProducts.module.css';

interface SearchProductsProps {
  searchProduct: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSortOrder: (order: 'recent' | 'favorite') => void;
  sortOrder: 'recent' | 'favorite';
}

const SearchContainer: React.FC<SearchProductsProps> = ({
  searchProduct,
  handleSearch,
  handleSortOrder,
  sortOrder,
}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOrder);

  const navigateToItemsPage = () => {
    router.push('/additem');
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionClick = (value: 'recent' | 'favorite') => {
    setSelectedOption(value);
    handleSortOrder(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.searchContainerWrapper}>
      <div className={styles.searchContainers}>
        <input
          type="text"
          placeholder="🔍 상품을 검색해주세요"
          value={searchProduct}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>
      <button onClick={navigateToItemsPage} className={styles.buttonProduct}>
        상품 등록하기
      </button>
      <div onClick={toggleDropdown} className={styles.dropdownWrapper}>
        {selectedOption === 'recent' ? '최신순' : '좋아요순'} ▼
        {isDropdownOpen && (
          <div className={styles.dropdownList}>
            <div
              onClick={() => handleOptionClick('recent')}
              className={styles.dropdownOption}
            >
              최신순
            </div>
            <div
              onClick={() => handleOptionClick('favorite')}
              className={styles.dropdownOption}
            >
              좋아요순
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
