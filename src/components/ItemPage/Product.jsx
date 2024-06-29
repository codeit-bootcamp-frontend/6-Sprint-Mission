import React, { useEffect, useRef, useState } from "react";
import search from "../../assets/img/search.svg";
import { useNavigate } from "react-router-dom";
import Items from "./Items";
import "./Product.css";
import { getProducts } from "../../api";
import OptionToggle from "./OptionToggle";

const getPageSize = () => {
  return window.innerWidth < 768 ? 4 : window.innerWidth < 1200 ? 6 : 10;
};
const Product = () => {
  const nav = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [optionToggle, setOptionToggle] = useState(false);
  const [orderBy, setOrderBy] = useState("최신순");
  const ref = useRef();

  const SortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    SortedData({ orderBy: "favorite", pageSize });
  }, [pageSize]);

  const ClickOption = (e) => {
    e.preventDefault();
    setOptionToggle(!optionToggle);
  };
  return (
    <>
      <div className="Product">
        <h1 className="Title">전체 상품</h1>
        <div className="ProductBar">
          <div className="searchBar">
            <img src={search} alt="검색버튼" className="searchImg" />
            <input
              className="searchInput"
              placeholder="검색할 상품을 입력해 주세요"
            />
          </div>
          <button
            onClick={() => {
              nav("/additems");
            }}
            className="loginLink"
          >
            상품 등록하기
          </button>
          <button className="optionButton" ref={ref} onClick={ClickOption}>
            {orderBy}
          </button>
          {optionToggle && (
            <div className="optionWrapper">
              <OptionToggle
                handleSortSelection={handleSortSelection}
                itemList={itemList}
              />
            </div>
          )}
        </div>
      </div>
      <div className="Item">
        {itemList?.map((item) => (
          <Items item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </>
  );
};

export default Product;
