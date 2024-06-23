import React from 'react';
import { useEffect, useState } from "react";
import { getProductInformation } from "../../../api/itemApi";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ItemComments from './ItemComments';
import heart from '../../../assets/images/icons/heart.png'
import turn from '../../../assets/images/icons/ic_back.png'

function ItemDetailPage() {
  const { itemId } = useParams();
  const [tags, setTags] = useState([]);
  const [item, setItem] = useState({
    images: '',
    name: '',
    price: 0,
    description: '',
    favoriteCount: 0,
    tags: []
  });
  const [text, setText] = useState("");

  const handleChange = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const ItemLoad = async () => {
      if (itemId) {
        const numberItemId = Number(itemId);
        const result = await getProductInformation(numberItemId);
        setItem(result);
        setTags(result.tags);
      }
    };
    ItemLoad();
  }, [itemId]);
  return (
    <Container>
      <ItemInfoArea>
        <div>
          <ProductImg src={item.images} alt="상품이미지" />
        </div>
        <InfoArea>
          <div>
            <TitlePrice>
              <Sell>{item.name} 팔아요</Sell>
              <Price>{Number(item.price).toLocaleString("ko-KR")}원</Price>
            </TitlePrice>
            <Line />
            <DescriptionArea>
              <SmallTitle>상품 소개</SmallTitle>
              <Description>{item.description}</Description>
            </DescriptionArea>
            <div>
              <SmallTitle>상품 태그</SmallTitle>
              <TagArea>
                {tags.map(item => {
                  return <Tag key={item}>#{item}</Tag>
                })}
              </TagArea>
            </div>
          </div>
          <div>
            <HeartArea><img src={heart} alt="heart" />{item.favoriteCount}</HeartArea>
          </div>
        </InfoArea>
      </ItemInfoArea>
      <MidLine />
      <div>
        <AskArea>
          <h3>문의하기</h3>
          <TextArea
            name='text'
            value={text}
            onChange={handleChange}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          ></TextArea>
          <RegisterBtnArea>
            <RegisterBtn disabled={!text} type='submit'>등록</RegisterBtn> 
          </RegisterBtnArea>
        </AskArea>
        <div>
          <ItemComments />
          <Link to='/items'>
            <BackBtnArea>
              <BackBtn>목록으로 돌아가기 <img src={turn} alt="back" /></BackBtn>
            </BackBtnArea>
          </Link>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
`;
const ItemInfoArea = styled.div`
  display: flex;
  gap: 16px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 104px;
  resize: none;
  padding: 16px 24px;
  border-radius: 12px;
  border: none;
  background-color: #f3f4f6;
`
const ProductImg = styled.img`
  width: 486px;
  height: 486px;
  border-radius: 16px;
`
const Sell = styled.h2`
  font-size: 24px;
`
const Price = styled.h1`
  font-size: 40px;
`
const InfoArea = styled.div`
  padding-top: 40px;
  width: 690px;
  height: 486px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const TitlePrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const Line = styled.div`
  width: 680px;
  height: 0px;
  border: 1px solid #E5E7EB;
  margin: 16px 0;
`
const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
`
const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: #1F2937;
`
const SmallTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: left;
  color: #4B5563;
`
const TagArea = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 8px;
`
const Tag = styled.div`
  padding: 6px 16px;
  border-radius: 26px;
  background-color: #F3F4F6;
  color: #1F2937;
`
const HeartArea = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 35px;
  border: 1px solid #E5E7EB;
  font-size: 16px;
  cursor: pointer;
`
const MidLine = styled.div`
  width: 1200px;
  border: 1px solid #E5E7EB;
  margin: 24px 0 18px;
`
const AskArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`
const RegisterBtnArea= styled.div`
  display: flex;
  justify-content: end;
`
const RegisterBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 42px;
  padding: 12px 23px;
  border-radius: 8px;
  color: #FFFFFF;
  background-color: var(--blue);
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #2083FD;
  }
  &:disabled {
    cursor: default;
    background-color: #9CA3AF;
  }
`
const BackBtnArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
`
const BackBtn = styled.button`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 48px;
  padding: 12px 71px;
  border-radius: 40px;
  background-color: var(--blue);
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  &:hover {
    background-color: #2083FD;
  }
`

export default ItemDetailPage;
