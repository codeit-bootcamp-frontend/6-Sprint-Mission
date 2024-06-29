import React from "react";
import { useNavigate } from "react-router";
import heart from "../../assets/img/heart.svg";
import "./Items.css";

const Items = ({ item }) => {
  const nav = useNavigate();

  const handleCardClick = (id) => {
    nav(`/items/${item.id}`);
  };

  console.log(item);
  return (
    <div className="Items" onClick={handleCardClick}>
      <img src={item.images[0]} alt={item.name} className="itemImg" />
      <div>
        <h1 className="ItemsName">{item.name} </h1>
        <span className="ItemsPrice">{item.price.toLocaleString()}원</span>
        <div className="ItemsFavorite">
          <img src={heart} />
          <span>{item.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
