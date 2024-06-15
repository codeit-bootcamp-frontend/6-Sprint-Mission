import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchIcon from '@/public/images/icons/ic_search.svg';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const curKeyword = (router.query.q as string) || '';
    setKeyword(curKeyword);
  }, [router.query.q]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  return (
    <div className="flex items-center relative">
      <div className="absosulte z-10 ml-4">
        <SearchIcon alt="검색" />
      </div>
      <input
        value={keyword}
        onChange={handleChangeKeyword}
        onKeyDown={handleKeyDown}
        placeholder="검색할 키워드를 입력해주세요"
        className="w-[1054px] py-2 pr-5 pl-11 absolute bg-[#f3f4f6] rounded-xl"
      />
    </div>
  );
};

export default SearchBar;
