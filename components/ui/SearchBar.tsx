import styled from "styled-components";
import { FlexRowCentered } from "@/styles/CommonStyles";
import SearchIcon from "@/public/images/icons/ic_search.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Container = styled(FlexRowCentered)`
  background-color: var(--gray-100);
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
`;

const SearchBarInput = styled.input`
  border: none;
  flex: 1;
  background-color: inherit;
  margin-left: 4px;

  &::placeholder {
    color: var(--gray-400);
    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "검색할 키워드를 입력해 주세요",
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const currentKeyword = (router.query.q as string) || "";
    setKeyword(currentKeyword);
  }, [router.query.q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // onKeyPress는 최신 리액트 버전에서 deprecated 되었기 때문에 onKeyDown, onKeyUp 등을 사용하는 것을 권장해요.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <Container>
      <Image src={SearchIcon} alt="검색" width={24} height={24} />
      <SearchBarInput
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default SearchBar;
