import { useState } from "react";
import "./producttag.css";

function ProductTag() {
  const [tag, setTag] = useState("");

  const ProductTagChange = (e) => {
    setTag(e.target.value);
  };

  return (
    <>
      <label className="productWord" htmlFor="tag">
        판매가격
      </label>
      <form className="producttag">
        <input
          type="text"
          value={tag}
          placeholder="상품명을 입력해주세요"
          onChange={ProductTagChange}
        ></input>
      </form>
    </>
  );
}

export default ProductTag;
