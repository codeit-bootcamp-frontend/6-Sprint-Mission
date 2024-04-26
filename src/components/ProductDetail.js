import styled from "styled-components";
import KebabIcon from "../assets/images/ic_kebab.png";
import ProductDetailStyle from "../css/ProductDetailStyle";

const {
  ProductDetailContainer,
  ProductImageContainer,
  ProductImage,
  ProductInfoContainer,
  TagTitle,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  LikeCount,
  TagText,
  TagItem,
  TagList,
} = ProductDetailStyle;

const ProductDetail = ({ product }) => {
  const { name, description, price, images, favoriteCount, tags } = product;

  return (
    <ProductDetailContainer>
      <ProductImageContainer>
        <ProductImage src={images[0]} alt={name} />
      </ProductImageContainer>
      <ProductInfoContainer>
        <ProductTitle>
          {name} 팔아요 <Logo src={KebabIcon} />
        </ProductTitle>
        <ProductPrice>{price.toLocaleString()}원</ProductPrice>
        <TagTitle>상품소개</TagTitle>
        <ProductDescription>{description}</ProductDescription>
        <TagTitle>상품태그</TagTitle>
        <TagList>
          {tags.map((tag) => (
            <TagItem key={`tag-${tag}`}>
              <TagText>#{tag}</TagText>
            </TagItem>
          ))}
        </TagList>
        <LikeCount>
          {favoriteCount !== 0 ? "❤️" : "🤍"} {favoriteCount}
        </LikeCount>
      </ProductInfoContainer>
    </ProductDetailContainer>
  );
};

const Logo = styled.img.attrs({
  src: KebabIcon,
})``;

export default ProductDetail;
