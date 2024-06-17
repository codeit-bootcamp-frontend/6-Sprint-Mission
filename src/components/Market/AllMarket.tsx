import React, { useEffect, useState } from "react";
import "../../style/allMarket.css";
import HeartIcon from "../../assets/icon/ic_heart.svg";
import Arrow_left from "../../assets/icon/ic_arrow_left.svg";
import Arrow_right from "../../assets/icon/ic_arrow_right.svg";
import { Link } from "react-router-dom";
import SelectBtn from "./SelectBtn";
import { getMarketData } from "../API/API";
import { useMediaQuery } from "react-responsive";
import { SearchInput } from "./SearchInput";
import Commas from "../../util/Commas";
import LinkButton from "../../common/Button";

interface Item {
  id: number;
  name: string;
  images: string[];
  price: number;
  favoriteCount: number;
}

export default function AllMarket() {
  const [data, setData] = useState<Item[]>([]);
  const [order, setOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pageSize = 10;
        if (isMobile) pageSize = 4;
        else if (isTablet) pageSize = 6;
        const { list, totalCount } = await getMarketData({
          page: currentPage,
          size: pageSize,
          order,
        });
        setData(list);
        setTotalPages(Math.ceil(totalCount / pageSize));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, order, isMobile, isTablet]);

  const handleSortOrderChange = (selectedOrder: string) => {
    setOrder(selectedOrder);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleHeaderChange = () => {
    if (isMobile) {
      return (
        <div className="all-header">
          <div className="all-header-top">
            <div>
              <h1 className="all-title">판매 중인 상품</h1>
            </div>
            <div className="button">
              <LinkButton to="/additem">상품 등록하기</LinkButton>
            </div>
          </div>
          <div className="all-search-input">
            <div className="searchInput">
              <SearchInput />
            </div>
            <div className="selectInput">
              <SelectBtn onChange={handleSortOrderChange} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="all-header">
          <div>
            <h1 className="all-title">
              {isTablet ? "판매 중인 상품" : "전체 상품"}
            </h1>
          </div>
          <div className="all-search-input">
            <div className="searchInput">
              <SearchInput />
            </div>
            <div className="button">
              <LinkButton to="/additem">상품 등록하기</LinkButton>
            </div>
            <div className="selectInput">
              <SelectBtn onChange={handleSortOrderChange} />
            </div>
          </div>
        </div>
      );
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => handlePageChange(i)}
          className={"pageBtn " + (currentPage === i ? "active" : "")}
        >
          {i}
        </div>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="all-market">
        {handleHeaderChange()}
        {data.length > 0 && (
          <div className="cards">
            {data.map((item) => (
              <Link to={`/items/${item.id}`} key={item.id}>
                <div className="card">
                  <img
                    className="all-img"
                    src={item.images[0]}
                    alt={item.name}
                  />
                  <p className="all-name">{item.name}</p>
                  <p className="all-price">{Commas(item.price)}원</p>
                  <div className="like">
                    <img src={HeartIcon} alt="Heart" />
                    <p>{item.favoriteCount}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="pagination">
        <div className="pageBtn">
          <img
            src={Arrow_left}
            onClick={() => handlePageChange(currentPage - 1)}
            alt="arrow_left"
          />
        </div>
        {renderPageNumbers()}
        <div className="pageBtn">
          <img
            src={Arrow_right}
            onClick={() => handlePageChange(currentPage + 1)}
            alt="arrow_right"
          />
        </div>
      </div>
    </>
  );
}
