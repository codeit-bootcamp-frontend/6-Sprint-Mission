import { useState } from 'react';
import styled from "styled-components";
import Book from './assets/book.png'
import Robot from './assets/robot.png'


// 베스트 상품
const Main = styled.main`
`

const Container = styled.div`
  width: 1201px;
  height: 1154px;
  margin: 24px auto;
`

const ItemTitle = styled.div`
  width: 150px;
  height: 28px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 16px;
`

const ItemsArray = styled.div`
  
`

const ItemList = styled.figure`
  width: 1200px;
  height: 406px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
`
const ItemCard = styled.img`
  width: 282px;
  height: 282px;
`

const PostTitle = styled.h4`
  width: 282px;
  height: 17px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  font-family: Pretendard;
  margin: 0;
`

const Price = styled.div`
  width: 282px;
  height: 19px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.09px;
  font-family: Pretendard;
  margin-top: 6px;
`

const CountLike = styled.div`
  width: 282px;
  height: 16px;
  display: flex;
  gap: 4px;
  margin-top: 6px;
`

const LikeButton = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19.09px;
  font-family: Pretendard;
  cursor: pointer;
`

const Count = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 19.09px;
  font-family: Pretendard;
`


// 판매 중

const SellingItemTitle = styled.div`
  width: 150px;
  height: 28px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 24px;
`

const SellingItemCard = styled.img`
  width: 221px;
  height: 221px;
`

const SellingItemsArray = styled.div`
  width: 221px;
  height: 221px;
`

const SellingItemList = styled.figure`
  width: 1200px;
  height: 300px;
  gap: 24px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 40px;
`

const itemsData = [
  { id: 1, title: '아이패드 미니 팝니다', price: '500,000원', alt: '아이패드 미니 사진' },
  { id: 2, title: '책 팝니다', price: '50,000원', alt: '책 사진' },
  { id: 3, title: '세탁기 팝니다', price: '500,000원', alt: '세탁기 사진' },
  { id: 4, title: '오븐 팝니다', price: '300,000원', alt: '오븐 사진' },
];

const sellingItemsData = [
  { id: 1, title: '로봇 청소기', price: '1,500,000원' },
  { id: 2, title: '청소 도구 팔아요', price: '5,000원' },
  { id: 3, title: '섀도우 팔레트', price: '20,000원' },
  { id: 4, title: '맥북 팝니다 m1칩 13인치', price: '200,000원' },
  { id: 5, title: '재킷 팝니다', price: '50,000원' },
];

const Items = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  }
  return (
      <Main>
      <Container>
        <ItemTitle>베스트 상품</ItemTitle>
        <ItemList>
        {itemsData.map(item => (
            <ItemsArray key={item.id}>
              <ItemCard src= {Book} alt={item.alt} />
              <PostTitle>{item.title}</PostTitle>
              <Price>{item.price}</Price>
              <CountLike>
                <LikeButton onClick={() => handleClick(item.id)}>
                  {count[item.id] === 0 ? '♡' : '♥'} 
                </LikeButton> 
                <Count>{count[item.id] || 0}</Count>
              </CountLike>
            </ItemsArray>
          ))}
        </ItemList>

        <SellingItemTitle>판매 중인 상품</SellingItemTitle>
        <SellingItemList>
        {sellingItemsData.map(item => (
            <SellingItemsArray key={item.id}>
              <SellingItemCard src= {Robot} alt={item.alt} />
              <PostTitle>{item.title}</PostTitle>
              <Price>{item.price}</Price>
              <CountLike>
                <LikeButton onClick={() => handleClick(item.id)}>
                  {count[item.id] === 0 ? '♡' : '♥'} 
                </LikeButton> 
                <Count>{count[item.id] || 0}</Count>
              </CountLike>
            </SellingItemsArray>
          ))}
        </SellingItemList>

        <SellingItemList>
        {sellingItemsData.map(item => (
            <SellingItemsArray key={item.id}>
              <SellingItemCard src= {Robot} alt={item.alt} />
              <PostTitle>{item.title}</PostTitle>
              <Price>{item.price}</Price>
              <CountLike>
                <LikeButton onClick={() => handleClick(item.id)}>
                  {count[item.id] === 0 ? '♡' : '♥'} 
                </LikeButton> 
                <Count>{count[item.id] || 0}</Count>
              </CountLike>
            </SellingItemsArray>
          ))}
        </SellingItemList>

      </Container> 
      </Main>
  );
};

export default Items;