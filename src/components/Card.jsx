import { useNavigate } from "react-router-dom";
import heartIcon from "../assets/ic_heart.png";
import "./Card.css";

function Card({
  favoriteCount,
  images,
  name,
  price,
  cardTitle,
  id,
  description,
  tags,
}) {
  const navigate = useNavigate();
  const itemImg = {
    backgroundImage: `url(${images[0]})`,
  };

  const cardPrice = `${Number(price).toLocaleString()}원`;

  const handleOnClick = () => {
    navigate(`/items/${id}`, {
      state: {
        productId: id,
        productTitle: cardTitle ? cardTitle : name,
        productPrice: cardPrice,
        productImage: itemImg,
        favoriteCount,
        productDescription: description,
        productTags: tags,
      },
    });
  };

  return (
    <li className='card' onClick={handleOnClick}>
      <div className='card-image' style={itemImg}></div>
      <div className='card-description'>
        <p className='card-title'>{cardTitle ? cardTitle : name}</p>
        <h3 className='card-price'>{cardPrice}</h3>
        <p className='card-favorite'>
          <img
            className='card-favorite-icon'
            src={heartIcon}
            alt='하트 아이콘'
          />
          <span className='card-favorite-count'>{favoriteCount}</span>
        </p>
      </div>
    </li>
  );
}

export default Card;
