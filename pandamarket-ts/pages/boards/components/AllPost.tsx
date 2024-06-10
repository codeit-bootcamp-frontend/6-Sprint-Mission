import React, { ChangeEvent, useEffect, useState } from "react";
import { getArticles } from "../../api/api";
import { Articles, OrderBy, Post } from "../../../types/articleResponseTypes";
import PostFeed from "./PostFeed";
import DropDownMenu from "../components/DropdownMenu";
import SearchIcon from "../../../public/assets/icon/ic_search.svg";
import Link from "next/link";
export async function getServerSideProps() {
  const allPosts: Articles = await getArticles("recent", 10);
  return {
    props: {
      initialArticle: allPosts,
    },
  };
}

interface AllPostProps {
  initialArticle: Articles;
}

const AllPost = ({ initialArticle }: AllPostProps) => {
  const [article, setArticle] = useState<Articles | null>(initialArticle);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<OrderBy>("recent");
  const [searchText, setSearchText] = useState("");
  const articleList: Post[] = article ? article.list : [];
  useEffect(() => {
    async function fetchArticle() {
      try {
        const response: Articles = await getArticles(orderBy, 10, searchText);
        if (!response) {
          throw new Error("게시물을 찾을 수 없습니다");
        }
        setArticle(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류 발생");
        }
      }
    }
    fetchArticle();
  }, [orderBy, searchText]);

  const handleSortSelection = (orderBy: OrderBy) => {
    setOrderBy(orderBy);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex place-content-between items-center">
        <h1 className="text-20px font-bold text-gray-900">게시글</h1>
        <Link
          href="/addboard/"
          className="rounded-[8px] bg-blue px-[23px] py-[12px] text-[16px] font-semibold text-white"
        >
          글쓰기
        </Link>
      </div>
      <div className="flex place-content-between items-center gap-[16px]">
        <div className="relative flex grow">
          <SearchIcon
            className="absolute left-[20px] top-1/2 -translate-y-1/2"
            viewBox="4 4 15 15"
            width="15"
            height="15"
          />
          <input
            value={searchText}
            onChange={handleInputChange}
            className="h-[42px] grow rounded-xl bg-gray-100 pl-[44px]"
            placeholder="검색할 상품을 입력해주세요"
          />
        </div>
        <DropDownMenu onSortSelection={handleSortSelection} />
      </div>
      <div>
        {articleList.map((article) => (
          <Link href={`/addboard/${article.id}`} key={article.id}>
            <PostFeed article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
