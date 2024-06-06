import { useEffect, useState } from "react";
import { getProductList } from "../api/api";
import Header from "../components/Header";
import CardContainer from "../components/CardContainer";
import Pagination from "../components/Pagination";

export default function ItemPage() {
  const [favoriteProductList, setFavoriteProductList] = useState([]);
  const [recentProductList, setRecentProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchFavoriteProductList() {
    try {
      const data = await getProductList(1, 4, "favorite");
      setFavoriteProductList(data.list);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchRecentProductList(page, query = "") {
    try {
      const data = await getProductList(page, 10, "recent", query);
      setRecentProductList(data.list);
      setTotalPages(Math.ceil(data.totalCount / 10));
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchRecentProductList(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchFavoriteProductList();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <CardContainer
        category="베스트 상품"
        productList={favoriteProductList}
        group="best"
        position="top"
      />
      <CardContainer
        category="전체 상품"
        productList={recentProductList}
        group="all"
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
