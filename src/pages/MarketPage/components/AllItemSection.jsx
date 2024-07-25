import { useEffect, useState } from "react";
import { getProduct } from "../../../api/api";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
import DropdownList from "../../../components/DropdownList";
import Pagination from "../../../components/Pagination";
import searchImage from "../../../imgs/icon/icon_search.svg";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 800) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
};

function AllItemSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [item, setItem] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fetchData = async ({ orderBy, page, pageSize, keyword }) => {
    const products = await getProduct({ orderBy, page, pageSize, keyword });
    setItem(products.list);
    setTotalPages(Math.ceil(products.totalCount / 10));
  };

  const handleSelection = (option) => {
    setOrderBy(option);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    sessionStorage.setItem("page", page);

    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchData({ orderBy, page, pageSize, keyword });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, keyword]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="m-auto sm:min-w-[320px] md:min-w-[344px] lg:min-w-[500px] xl:min-w-[600px] max-w-[1200px]">
      <div className="flex gap-[12px] items-center justify-center">
        <h1 className="flex-1 text-[20px] font-[700] mb-[16px] mt-[24px]">
          판매 중인 상품
        </h1>
        <div className="relative w-full max-w-xs">
          <input
            className="w-full h-[42px] pl-[40px] pr-[10px] py-[8px] bg-gray-100 outline-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            value={keyword}
            onChange={handleInputChange}
            placeholder="검색할 상품을 입력해주세요"
            id="name"
          />
          <img
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
            width="24"
            height="24"
            src={searchImage}
            alt="상품 검색"
          />
        </div>

        <button className="flex-none w-[133px] h-[42px] p-[12px 23px] gap-[10px] rounded-md bg-[var(--blue50)] text-[16px] font-[600] text-[#fff] hover:bg-[var(--blue70)]">
          <Link to="/additem">상품 등록하기</Link>
        </button>
        <div className="relative inline-block text-left">
          <button
            className="flex items-center justify-center w-[150px] h-[42px] text-[16px] font-semibold text-[var(--blue50)] rounded-lg border hover:bg-gray-200 focus:outline-none transition-colors"
            onClick={toggleMenu}
          >
            {orderBy === "recent" ? "최신순" : "좋아요순"}
          </button>
          {isMenuOpen && (
            <DropdownList
              onHandleSelection={handleSelection}
              toggleMenu={toggleMenu}
            />
          )}
        </div>
      </div>
      <div className="grid gap-[24px] grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {item?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default AllItemSection;
