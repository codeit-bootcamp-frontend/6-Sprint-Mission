import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

interface SearchFormProps {
  keyword?: string;
  onChangeKeyword?: (keyword: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  keyword = "",
  onChangeKeyword,
}) => {
  const [value, setValue] = useState(keyword);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) {
      router.push("/boards");
      onChangeKeyword(" ");
      return;
    }
    if (onChangeKeyword) {
      onChangeKeyword(value);
    }
    router.push(`boards?keyword=${value}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="keyword" value={value} onChange={handleChange} />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchForm;
