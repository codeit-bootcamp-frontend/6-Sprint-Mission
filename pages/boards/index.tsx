import BestPost from "@/components/boards/bestPost";
import Posts from "@/components/boards/posts";
import SearchInput from "@/components/boards/search";
import styles from "@/styles/Board.module.css";
import LinkButton from "@/utils/Button";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Dropdown from "@/components/boards/dropdown";
import { GetServerSideProps } from "next";
import { ArticlesList, BoardsProps } from "@/types";
import { useMediaQuery } from "react-responsive";
import Pagination from "@/components/boards/pagination";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get("/articles?pageSize=99");
    const PostsData: ArticlesList[] = res.data.list ?? [];

    return {
      props: {
        PostsData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        PostsData: [],
      },
    };
  }
};

export default function Board({ PostsData }: BoardsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<ArticlesList[]>(PostsData);
  const [order, setOrder] = useState<"recent" | "like">("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const router = useRouter();

  const isTablet = useMediaQuery({
    query: `(max-width: 1024px)`,
  });

  const isMobile = useMediaQuery({
    query: `(max-width: 768px)`,
  });

  const handleSortOrderChange = (selectedOrder: "recent" | "like"): void => {
    setOrder(selectedOrder);
  };

  const sortData = (
    data: ArticlesList[],
    order: "recent" | "like"
  ): ArticlesList[] => {
    if (order === "recent") {
      return data
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } else if (order === "like") {
      return data.slice().sort((a, b) => b.likeCount - a.likeCount);
    } else {
      return data;
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function renderPageButtons(
    length: number,
    isTablet: boolean,
    isMobile: boolean
  ) {
    const size = 5;
    setItemsPerPage(size);
    setTotalPages(
      Math.ceil(length / size) === 0 ? 1 : Math.ceil(length / size)
    );
  }

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      (page === 1 && currentPage === 1) ||
      (page === totalPages && currentPage === totalPages)
    )
      return;
    setCurrentPage(page);
    router.push(`${router.pathname}?page=${page}`, undefined, {scroll: false});
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = posts.filter((item) =>
    item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

  const currentItems = sortData(filteredData, order).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const sortedPosts = sortData(posts, order);
    setPosts(sortedPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    renderPageButtons(filteredData.length, isTablet, isMobile);
  }, [filteredData.length, isTablet, isMobile]);

  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string, 10) || 1);
  }, [router.query.page]);

  return (
    <div className={styles.BoardContainer}>
      <div className={styles.bestContainer}>
        <span className={styles.bestTopText}>베스트 게시글</span>
        <div className={styles.bestPosts}>
          <BestPost />
        </div>
      </div>
      <div className={styles.posts}>
        <div className={styles.postsTop}>
          <span className={styles.bestTopText}>게시글</span>
          <LinkButton href="/addboard">글쓰기</LinkButton>
        </div>
        <div className={styles.postsMiddle}>
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
          <Dropdown onChange={handleSortOrderChange} />
        </div>
        <div className={styles.postsContainer}>
          {currentItems.map((post) => (
            <Posts key={post.id} posts={post} />
          ))}
        </div>
        <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
      </div>
    </div>
  );
}
