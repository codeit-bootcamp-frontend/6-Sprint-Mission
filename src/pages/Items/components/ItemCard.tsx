import React from "react";
import "./ItemCard.css";
import likeIcon from "../../../assets/icon-like-heart.svg";
import { Link } from "react-router-dom";
import { ProductItem } from "../../../types";

interface ItemCardProps {
  item: ProductItem;
  best?: boolean;
  desktop?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, best, desktop }) => {
  const isDesktop = desktop && "desktop";
  const isBest = best && "best";

  return (
    <>
      {item ? (
        <Link
          to={`/products/${item.id}`}
          className={`container-item-card ${isBest}  ${isDesktop}`}
        >
          <div className={`image-container ${isBest}  ${isDesktop}`}>
            <img
              className={`image-item-card`}
              src={item?.images[0]}
              alt="상품 이미지"
            />
          </div>
          <div className="info-item-card">
            <p className="desc-item-card">{item.name}</p>
            <p className="price-item-card">{item.price}원</p>
            <div className="like-item-card">
              <img src={likeIcon} alt="하트 아이콘" />
              {item.favoriteCount}
            </div>
          </div>
        </Link>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ItemCard;
