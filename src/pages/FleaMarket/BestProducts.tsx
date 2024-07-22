import { styled } from "styled-components";
import ProductContainer from "./ProductContainer";
import { Product } from "../../types";

interface BestProductsProps {
  bestProducts: Product["list"];
}

function BestProducts({ bestProducts }: BestProductsProps) {
  return (
    <BestProductsContainer>
      <BestProductsTitle>베스트 상품</BestProductsTitle>
      <BestProductsList>
        {bestProducts?.map((product) => (
          <ProductContainer
            key={product.id}
            src={product.images}
            alt={product.name}
            description={product.name}
            price={product.price}
            favoriteCount={product.favoriteCount}
            productId={product.id}
          />
        ))}
      </BestProductsList>
    </BestProductsContainer>
  );
}

export default BestProducts;

const BestProductsContainer = styled.div`
  margin-bottom: 40px;
`;

const BestProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 1200px;
  gap: 24px;
`;

const BestProductsTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: var(--main-text-color);
  margin-bottom: 16px;
`;
