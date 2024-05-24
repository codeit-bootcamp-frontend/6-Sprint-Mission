import { getProduct } from "../../../api";
// import ItemCard from "./ItemCard";
import styled from 'styled-components';
// import React, { useEffect, useState } from 'react';


const ItemImage = styled.div`
  width: 100%;
  height: 100%;

  img{
    border-radius: 12px;
    width: 100%;
    height: auto;
  }
`
const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: flex-start;
`;

interface Product {
    images: string[];
    name: string;
    price: number;
    description: string;
  }

  const getProduct = async (): Promise<Product> => {
    const response = await fetch("https://example.com/api/product");
    const data = await response.json();
    return data;
  };
  
const ItemDetailSection: React.FC = () => {
    return(
        <>
            <ItemImage>
            <img src={getProduct.images[0]} alt={`${product.name} 상품 대표 사진`} />
            </ItemImage>
            <ItemDetailContainer>
                <div>
                    <ItemTitle>{getProduct.name}</ItemTitle>
                    <ItemPrice>{getProduct.price.toLocaleString()}원</ItemPrice>
                </div>

                <div>
                    <SectionLabel>상품 소개</SectionLabel>
                    <Description>{getProduct.description}</Description>
                </div>
            </ItemDetailContainer>
        </>
        
    );
};

export default ItemDetailSection;