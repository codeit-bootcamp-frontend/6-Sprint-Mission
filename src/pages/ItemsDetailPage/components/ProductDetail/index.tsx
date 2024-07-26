/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  Image,
  ContentWrapper,
  Title,
  Price,
  Division,
  Description,
  ItemTag,
  Favorite,
} from './style';
import { formatNumberToWon } from 'utils/formatNumber';
import Heart from 'assets/icons/Heart';
import { getProductDetail } from 'api/getProductDetail';
import useLoading from 'hooks/useLoading';
import { ItemType } from 'types/item';
import NewDropDown from 'components/NewDropDown';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from 'api/product/deleteProduct';
import { useNavigate } from 'react-router-dom';

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const navigate = useNavigate();

  const { isLoading, error, handleLoad } = useLoading(getProductDetail);
  const [item, setItem] = useState<ItemType | null>(null);

  const userId = localStorage.getItem('userId');

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      alert('게시물 삭제 성공');
      navigate('/items');
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleProductLoad = async () => {
    const product = await handleLoad({ productId: productId });
    if (product) {
      setItem(product);
    }
  };

  const handleClickItem = (label: string) => {
    if (label === '수정하기') {
      alert('미구현 기능');
    } else {
      mutate(productId);
    }
  };

  useEffect(() => {
    handleProductLoad();
  }, []);

  if (isLoading || item === null) {
    return <h1>로딩중</h1>;
  } else if (error) {
    return <h1>{error.message}</h1>;
  } else {
    return (
      <Wrapper>
        <Image alt={item.name} src={item.images[0]} />
        <ContentWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>{item.name}</Title>
            {Number(userId) === item.ownerId && (
              <NewDropDown
                options={['수정하기', '삭제하기']}
                handleClickItem={handleClickItem}
              />
            )}
          </div>
          <Price>{formatNumberToWon(item.price)}</Price>
          <Division />
          <Description>
            <span>상품 소개</span>
            <p>{item.description}</p>
          </Description>
          <ItemTag>
            <span>상품 태그</span>
            <div>
              {item.tags.map((item) => {
                return <span key={item}>#{item}</span>;
              })}
            </div>
          </ItemTag>
          <Favorite>
            <Heart stroke="#6b7280" width={32} height={32} />
            <span>{item.favoriteCount}</span>
          </Favorite>
        </ContentWrapper>
      </Wrapper>
    );
  }
};

export default ProductDetail;
