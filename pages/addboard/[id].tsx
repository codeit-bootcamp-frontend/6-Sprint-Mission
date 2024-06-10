import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../components/Header";
import Heart from "../../images/heart.svg";
import Dots from "../../images/3dots.svg";
import Turnback from "./../../images/turnback.svg";
import { createGlobalStyle } from "styled-components";
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import Link from "next/link";
import { useRouter } from "next/router";
import profile from "../../images/ic_profile.png";
import Image from "next/image";

interface Board {
  title: string;
  nickname: string;
  image: string;
  content: string;
  likeCount: number;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
}
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard";
    font-style: normal;
  }
`;

function BoardDetail() {
  const router = useRouter();
  const { id } = router.query;
  const numericId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id || "", 10);

  const [board, setBoard] = useState<Board | null>(null);

  const getBoardById = async (id: number) => {
    try {
      const response = await axios.get(
        `https://panda-market-api.vercel.app/articles/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  console.log("id", id);

  useEffect(() => {
    const fetchBoard = async () => {
      if (!numericId || isNaN(numericId)) {
        console.error("ID가 유효하지 않습니다.");
        return;
      }

      try {
        const data = await getBoardById(numericId);
        setBoard(data);
      } catch (error) {
        console.error("상품 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchBoard();
  }, [numericId]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <ProductContainer>
          {board ? (
            <>
              <div style={{ display: "flex" }}>
                <Title>{board.title}</Title>
                <DotsContainer>
                  <Dots />
                </DotsContainer>
              </div>
              <ProfileContainer>
                <Image src={profile} alt="프로필" />
                <Name>{board.writer.nickname}</Name>
                <CreatedAt>{board.createdAt}</CreatedAt>
                <CreatedAt>|</CreatedAt>
                <ProductLikes>
                  <Heart />
                  {board.likeCount}
                </ProductLikes>
              </ProfileContainer>

              <Divider />
              <ProductImage src={board.image} alt={board.nickname} />
              <ProductInfo>
                <Description>{board.content}</Description>
              </ProductInfo>
            </>
          ) : (
            <div>로딩 중...</div>
          )}
        </ProductContainer>
        <CommentInput />
        <CommentList />
        <Link href="/items">
          <BackButton>
            목록으로 돌아가기
            <Turnback />
          </BackButton>
        </Link>
      </Container>
    </>
  );
}

export default BoardDetail;

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 20px auto;
  @media (max-width: 1199px) {
    width: 696px;
  }
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 690px;
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #1f2937;
`;
const ProfileContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const ProductImage = styled.img`
  width: 486px;
  height: 486px;
  border-radius: 16px;
  @media (max-width: 1199px) {
    width: 340px;
    height: 340px;
  }
`;
const Name = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4b5563;

  @media (max-width: 1199px) {
    font-size: 20px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;
const CreatedAt = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9ca3af;
`;
const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #1f2937;
`;
const ProductLikes = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4b5563;
  display: flex;
  gap: 10px;
  align-items: center;
`;
const DotsContainer = styled.img`
  position: absolute;
  margin: 0 0 0 680px;
  @media (max-width: 1199px) {
    margin: 0 0 0 330px;
  }
  @media (max-width: 767px) {
    margin: 0 0 0 330px;
  }
`;

const Heart1 = styled.img`
  margin-right: 5px;
  width: 26px;
  height: 26px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 16px;
`;

const BackButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 240px;
  height: 48px;
  background: #3692ff;
  border-radius: 40px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  margin: 24px auto;
`;
