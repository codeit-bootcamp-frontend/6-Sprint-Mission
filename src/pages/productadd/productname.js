import { useState } from "react";

function Productname() {
  const [name, setName] = useState("");

  const ProductNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <label className="productWord" htmlFor="name">
        상품명
      </label>
      <form className="productname">
        <input
          type="text"
          value={name}
          placeholder="상품명을 입력해주세요"
          onChange={ProductNameChange}
        ></input>
      </form>
    </>
  );
}

export default Productname;
