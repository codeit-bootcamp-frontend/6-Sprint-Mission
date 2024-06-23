import React from "react";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";
import { Link } from 'react-router-dom';

interface Item {
  id: number;
  images: string[];
  name: string;
  price: number;
  favoriteCount: number;
}

interface ItemCardProps {
  item: Item;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Link to={`${item.id}`}>
      <div className="itemCard">
        <img src={item.images[0]} alt={item.name} className="itemCardThumbnail" />
        <div className="itemSummary">
          <h2 className="itemName">{item.name}</h2>
          <p className="itemPrice">{item.price.toLocaleString()}원</p>
          <div className="favoriteCount">
            <HeartIcon />
            {item.favoriteCount}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
