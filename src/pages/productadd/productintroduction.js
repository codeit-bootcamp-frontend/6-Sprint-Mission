import { useState } from "react";

function Productintroduction() {
  const [introduction, setIntroduction] = useState("");

  const ProductIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  return (
    <>
      <label className="productWord" htmlFor="introduction">
        상품 소개
      </label>
      <form className="producintroduction">
        <input
          type="text"
          value={introduction}
          placeholder="상품 소개를 입력해주세요"
          onChange={ProductIntroductionChange}
        ></input>
      </form>
    </>
  );
}

export default Productintroduction;
