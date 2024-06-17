import React from "react";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    // 상품 카드 클릭 시 해당 상품의 상세페이지로 이동
    <Link to={`/items/${item.id}`} className="itemCard">
      <img
        src={item.images[0]}
        alt={`${item.name} 상품 썸네일`}
        className="itemCardThumbnail"
      />
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
