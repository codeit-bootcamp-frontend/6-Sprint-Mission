import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Container, LineDivider, StyledLink } from "../../styles/CommonStyles";
import { getProductDetail } from "../../api/itemApi";
import ItemProfileSection from "./components/ItemProfileSection";
import ItemCommentSection from "./components/ItemCommentSection";
import { ReactComponent as BackIcon } from "../../assets/images/icons/ic_back.svg";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const BackToMarketPageLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  tags: string[];
  isFavorite: boolean;
  favoriteCount: number;
}

function ItemPage() {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["productDetail", productId],
    queryFn: () => {
      if (productId) {
        return getProductDetail(productId);
      }
      return Promise.reject(new Error("상품 아이디가 제공되지 않았어요."));
    },
    enabled: !!productId,
  });

  if (error) {
    alert(`오류: ${error.message}`);
  }

  if (!productId || !product) return null;

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <Container>
        <ItemProfileSection product={product} />

        <LineDivider />

        <ItemCommentSection productId={productId} />

        <BackToMarketPageLink to="/items">
          목록으로 돌아가기
          <BackIcon />
        </BackToMarketPageLink>
      </Container>
    </>
  );
}

export default ItemPage;
