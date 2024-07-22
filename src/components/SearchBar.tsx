import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

interface searchBarProps {
  windowWidth: number;
  selectValue: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SearchBar = ({ windowWidth, onChange, selectValue }: searchBarProps) => {
  return (
    <div className='totalProduct'>
      <div className='titleAndSearch'>
        <p className='title'>
          {windowWidth < 1999 ? '판매 중인 상품' : '전체 상품'}
        </p>
        <input
          className='search'
          placeholder='검색할 상품을 입력해주세요'
        ></input>
      </div>
      <div className='buttons'>
        <Link to={'/addItem'} className='submit'>
          상품 등록하기
        </Link>
        <select onChange={onChange} value={selectValue} className='filter'>
          <option value={'1'}>최신순</option>
          <option value={'2'}>좋아요순</option>
        </select>
      </div>
    </div>
  );
};
export default SearchBar;

