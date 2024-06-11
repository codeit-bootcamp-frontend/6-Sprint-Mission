import React from "react";
import heartIcon from "../../../assets/images/Icon.svg";
import "./ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div>
      <img className="cardImg" src={item.images} alt={item.name} />
      <div>
        <h2 className="cardName">{item.name}</h2>
        <p className="cardPrice">{item.price}원</p>
        <div className="cardFavorite">
          <img src={heartIcon} alt="heartIcon" width="13.4" />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
