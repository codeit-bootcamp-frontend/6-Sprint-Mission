import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";
import "./AllProducts.css";
import searchIcon from "../assets/ic_search.png";
import arrowIcon from "../assets/ic_arrow_down.png";
import Card from "./Card";
import leftArrow from "../assets/arrow_left.png";
import rightArrow from "../assets/arrow_right.png";

function AllProducts() {
  const [items, setItems] = useState([]);
  const [allPage, setAllPage] = useState(1);

  const handleAllLoad = async (options) => {
    try {
      const { list } = await getAllProducts(options);
      if (options.allPage === 1) {
        setItems(list);
      } else {
        const nextItems = [...list];
        setItems(nextItems);
      }
    } catch (error) {
      console.error(`Error: handleAllLoad from AllProducts.jsx`, error);
    }
  };

  useEffect(() => {
    handleAllLoad({ allPage, pageSize: 10, orderBy: "recent" });
  }, [allPage]);

  const cardDescription = items.map((item) => item.description.split(" "));
  let cardTitles = [];

  cardDescription.forEach((itemDesc) => {
    const findIndex = itemDesc.findIndex(
      (str) => str === "팔아요" || str === "팝니다"
    );
    const title = itemDesc.slice(0, findIndex + 1).join(" ");
    cardTitles.push(title);
  });

  const sliceEnd = 5;
  const topItems = items.slice(0, sliceEnd);
  const topItemsTitle = cardTitles.slice(0, sliceEnd);
  const underItems = items.slice(sliceEnd);
  const underItemsTitle = cardTitles.slice(sliceEnd);

  const buttons = [1, 2, 3, 4, 5];

  const handleOnClick = (e) => {
    const pageNumber = Number(e.currentTarget.value);
    setAllPage(pageNumber);
  };

  const handleOnPrev = () => {
    if (allPage !== 1) {
      setAllPage(allPage - 1);
    }
  };

  const handleOnNext = () => {
    if (allPage < 5) {
      setAllPage(allPage + 1);
    }
  };

  return (
    <div className='all-products'>
      <div className='all-products-header'>
        <h1>전체 상품</h1>
        <div className='all-products-nav'>
          <form className='search-form'>
            <button className='search-button'>
              <img src={searchIcon} alt='검색 아이콘' />
            </button>
            <input
              className='search-input'
              type='text'
              placeholder='검색할 상품을 입력해주세요'
            />
          </form>
          <div className='order-lists'>
            <Link to='/items/addItem'>
              <button type='button' className='add-item-button'>
                <span>상품 등록하기</span>
              </button>
            </Link>
            <ul className='order-list'>
              <li className='order-recent'>
                <span>최신순</span>
                <img
                  className='order-button'
                  src={arrowIcon}
                  alt='화살표 아이콘'
                />
              </li>
              <ul className='order-menus'>
                <li className='menu-recent'>최신순</li>
                <li className='menu-favorite'>좋아요순</li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      <div className='all-products-contents'>
        <ul className='all-products-wrap'>
          {topItems.map((item, i) => (
            <Card key={item.id} {...item} cardTitle={topItemsTitle[i]} />
          ))}
        </ul>
        <ul className='all-products-wrap'>
          {underItems.map((item, i) => (
            <Card key={item.id} {...item} cardTitle={underItemsTitle[i]} />
          ))}
        </ul>
      </div>
      <div className='all-page-buttons'>
        <button onClick={handleOnPrev} className='page-button'>
          <img src={leftArrow} alt='이전 버튼' />
        </button>
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={handleOnClick}
            className='page-button button-number'
            value={btn}
          >
            {btn}
          </button>
        ))}
        <button onClick={handleOnNext} className='page-button'>
          <img src={rightArrow} alt='다음 버튼' />
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
