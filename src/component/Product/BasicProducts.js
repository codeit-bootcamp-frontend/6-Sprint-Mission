import { getItems } from "../../api/Api.js";
import Select from "react-select";
import { useState, useEffect, React } from "react";
import ProductList from "./ProductList.js";
import { Link } from "react-router-dom";
import Paging from "../Paging.js";

function BasicProducts() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const orderValue = [
    { value: "recent", label: "최신순", className: "order-value-recent" },
    { value: "favorite", label: "좋아요순", className: "order-value-favorite" },
  ];
  const customStyles = {
    control: (provided) => ({
      borderRadius: "10px",
      border: "1px solid #ddd",
      boxShadow: "none",
      padding: "5px 6px",
      "&:hover": {
        color: "#7db4f4",
      },
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: isSelected ? "#3182f6" : "inherit",
      boderBottom: "1px solid #ddd",
      zIndex: 1,
      background: isFocused ? "#fff" : isSelected ? "#fff" : undefined,
    }),
  };
  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    setPage(1);
  };

  const productsLoad = async (orderBy, page) => {
    const { list, totalCount } = await getItems({ orderBy, page });
    setTotalCount(totalCount);
    setItems(list);
  };
  useEffect(() => {
    productsLoad(order, page); // <- ?
  }, [order, page]);

  return (
    <div>
      <div className="basic-product-header">
        <h2>전체 상품</h2>
        <input placeholder="검색할 상품을 입력해주세요" />
        <Link to="/Product/addItem">
          <button>상품 등록하기</button>
        </Link>
        <div className="selectBox">
          <Select
            classNamePrefix="react-select"
            styles={customStyles}
            className="orderSelect"
            options={orderValue} //위에서 만든 배열을 select로 넣기
            onChange={(
              selectedOption //값이 바뀌면 setState되게
            ) => handleOrderChange(selectedOption.value)}
            defaultValue={orderValue[0]} //사용자가 값을 선택하지 않아도 기본
          />
        </div>
      </div>
      <div className="basic-items">
        <ProductList items={items} />
        <Paging
          page={page}
          pageSize={12}
          totalCount={totalCount}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}

export default BasicProducts;
