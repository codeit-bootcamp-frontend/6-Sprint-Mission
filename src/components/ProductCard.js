import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product, showLikes = false }) => {
  const { name, price, images, favoriteCount } = product;
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/items/${product.id}`);
  };

  return (
    <ProductCardWrapper onClick={handleProductClick}>
      <ProductImage src={images[0]} alt={name} />
      <ProductName>{name}</ProductName>
      <ProductPrice>{price}원</ProductPrice>
      {showLikes && (
        <ProductLikes>
          {favoriteCount !== 0 ? "❤️" : "🤍"} {favoriteCount}
        </ProductLikes>
      )}
    </ProductCardWrapper>
  );
};

const ProductCardWrapper = styled.div`
  width: 100%;
  max-width: 221px;
  height: 100%;
  border: none;
  padding: 0.5rem;
  text-align: center;
  object-fit: cover;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 221px;
  height: 290px;

  aspect-ratio: 1;
  border-radius: 16px;
`;

const ProductName = styled.h3`
  margin: 0.8rem 0;
  width: 116px;
  height: 17px;
  font-size: 13px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 19.09px;
  text-align: left;
`;

const ProductLikes = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  text-align: left;
  color: #4b5563;
  padding-top: 10px;
`;

export default ProductCard;
