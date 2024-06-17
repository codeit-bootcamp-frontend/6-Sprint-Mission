import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';

const SelectAndSearchContainer = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<'recent' | 'like'>(
    'recent'
  );
  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'recent') {
      setSelectedOption(e.target.value);
    } else if (e.target.value === 'like') setSelectedOption(e.target.value);
  };
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = e.target.value;
    }
  };
  const onChangeKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/boards?keyword=${ref.current?.value}`);
    }
  };
  useEffect(() => {
    router.push(`/boards?page=1&pageSize=5&orderBy=${selectedOption}`);
  }, [selectedOption]);
  return (
    <SearchBar
      ref={ref}
      selectOption={selectedOption}
      onChangeSelectHandler={onChangeSelectHandler}
      onChangeInputHandler={onChangeInputHandler}
      onChangeKeyDownHandler={onChangeKeyDownHandler}
    />
  );
};

export default SelectAndSearchContainer;

