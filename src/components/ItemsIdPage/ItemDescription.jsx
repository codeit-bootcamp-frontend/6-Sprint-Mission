import React, { useState } from "react";
import Tags from "./Tags";
import heart from "../../assets/img/heart.svg";
import heart_red from "../../assets/img/heart-red.svg";
import "./ItemDescription.css";

function ItemDescription({ product }) {
  const [heartChange, setHeartChange] = useState(true);
  const [heartCount, setHeartCount] = useState(product.favoriteCount);

  const handleHeartChanger = () => {
    setHeartChange(!heartChange);
    setHeartCount(heartChange ? heartCount + 1 : heartCount - 1);
  };

  console.log(product);
  return (
    <div className="DescriptionContainer">
      <img
        className="ItemsImg"
        src={product.images[0]}
        alt={` 상품 대표 사진`}
      />
      <div className="ItemDetailsContainer">
        <div>
          <div className="ItemDetailName">{product.name}</div>
          <div className="ItemDetailPrice">
            {product.price.toLocaleString()}원
          </div>
          <hr />
          <div>
            <div className="ItemsIntroduce">상품소개</div>
            <div className="ItemDetailDescription">{product.description}</div>
          </div>
          <div className="TagsContainer">
            <div className="ItemsTag">상품태그</div>
            <Tags tags={product.tags} />
          </div>
        </div>
        <button className="PillButton" onClick={handleHeartChanger}>
          <div className="ButtonContent">
            <img className="heartIcon" src={heartChange ? heart : heart_red} />
            {heartCount}
          </div>
        </button>
      </div>
    </div>
  );
}

export default ItemDescription;
