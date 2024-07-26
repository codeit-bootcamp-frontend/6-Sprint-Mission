import React, { useEffect, useState } from "react";
import icon_favorite from "../assets/icon_favorite.png";
import img_profile from "../assets/img_profile.png";
import icon_search from "../assets/icon_search.png";
import icon_order from "../assets/icon_order.png";
import icon_dropdown from "../assets/icon_dropdown.png";
import NewPagination from "./NewPagination";
import { Link } from "react-router-dom"
import { getPosts, getTotalPosts } from "../api/api"
import formatDate from "../utils/formatDate"

type PostsData = {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
};

type PostsProps = {
  initialPosts: PostsData[];
};


const selectOptions = [
  { value: "recent", label: "최신순" },
  { value: "like", label: "좋아요순" },
];

export default function Posts({ initialPosts }: PostsProps) {
  const [posts, setPosts] = useState<PostsData[]>(initialPosts);
  const [keyword, setKeyword] = useState("");
  const [isDropdownView, setDropdownView] = useState(false);
  const [order, setOrder] = useState(selectOptions[0].value);

  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(10); // 한 페이지당 보여질 게시글 개수
  const [totalPosts, setTotalPosts] = useState(0); // 전체 게시글 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalPosts = await getTotalPosts();
        setTotalPosts(totalPosts);

        const data = await getPosts({
          orderBy: order,
          keyword: keyword,
          page: page,
          pageSize: pageSize,
        });

        setPosts(data);
      } catch (error) {
        console.error("posts 가져오는데 문제 발생:", error);
      }
    };
    fetchData();
  }, [order, keyword, page, pageSize]);

  const handleKeywordSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownView(!isDropdownView);
  };

  const selectOption = (value: string) => {
    setOrder(value);
    setDropdownView(false);
  };

  // 페이지 버튼을 누를 때도 page 변경하기
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex w-full items-center justify-between">
          <div className="absolute left-4 top-[0.6rem]">
            <img src={icon_search} alt="검색 아이콘" width={24} height={24} />
          </div>
          <input
            className="flex h-[42px] flex-shrink-0 flex-grow basis-auto rounded-md border-none bg-gray-50 px-10 py-2 focus:outline-none"
            placeholder="검색할 게시글 제목을 입력해주세요"
            type="search"
            onChange={handleKeywordSearch}
          />
        </div>
        <div
          className="relative flex h-[42px] w-[2rem] cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 md:w-[8rem]"
          onClick={toggleDropdown}
        >
          <picture className="flex items-center">
            <source
              srcSet={icon_order}
              media="(max-width: 768px)"
              className="h-[24px] w-[24px] md:hidden"
            />
            <span className="hidden md:inline">
              {selectOptions.find((option) => option.value === order)?.label}
            </span>
            <img src={icon_dropdown} alt="드롭다운" width={24} height={24} />
          </picture>
          {isDropdownView && (
            <ul className="absolute -left-10 top-full z-50 m-0 w-max list-none rounded-md border border-gray-200 bg-white p-0 md:-left-0 md:w-full">
              {selectOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => selectOption(option.value)}
                  className="cursor-pointer border-b border-gray-200 p-2 text-center hover:bg-gray-200"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id}>
                <div className="w-full max-w-5xl border-b border-gray-200 pb-4 pt-4">
                  <Link
                    to={`/boards/${post.id}`}
                    className="flex h-[80px] items-start justify-between gap-1"
                  >
                    <h3 className="m-0 p-0 font-bold">{post.title}</h3>
                    {post.image && (
                      <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded border border-gray-200 bg-white p-4">
                        <img
                          src={post.image}
                          alt="포스트 이미지"
                          width={48}
                          height={48}
                        />
                      </div>
                    )}
                  </Link>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={img_profile}
                        alt="프로필 이미지"
                        width={24}
                        height={24}
                      />
                      <p className="text-sm text-gray-600">
                        {post.writer.nickname}
                      </p>
                      <p className="text-sm text-gray-400">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src={icon_favorite}
                        alt="하트"
                        width={16}
                        height={16}
                      />
                      <p className="text-sm text-gray-600">{post.likeCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <NewPagination
        currentPage={page}
        totalPages={Math.ceil(totalPosts / pageSize)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
