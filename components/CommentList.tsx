import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import NoneComments from "../images/NoArticleComment.svg";
import dots from "../images/3dots.svg";
import { useRouter } from "next/router";

interface Comment {
  id: number;
  content: string;
  image: string;
  nickname: string;
  updatedAt: string;
}

function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const numericId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id || "", 10);

  const getComments = async (id: number) => {
    try {
      const response = await axios.get(
        `https://panda-market-api.vercel.app/articles/${id}/comments/limit=10`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!numericId || isNaN(numericId)) {
      console.error("ID가 유효하지 않습니다.");
      return;
    }

    const fetchComments = async () => {
      try {
        const data = await getComments(numericId);
        setComments(data.list);
        console.log(data);
      } catch (error) {
        console.error("댓글을 불러오는 데 실패했습니다:", error);
      }
    };

    fetchComments();
  }, [numericId]);

  return (
    <>
      {!comments || comments.length === 0 ? (
        <NoneCommentsContainer>
          <NoneComments />
          <NoneCommentsText>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </NoneCommentsText>
        </NoneCommentsContainer>
      ) : (
        <>
          <CommentListContainer>
            {comments.map((comment, id) => (
              <div key={id}>
                <div style={{ display: "flex", width: "100%" }}>
                  <Content>{comment.content}</Content>
                  <Dots src={dots} />
                </div>
                <ProfileContainer>
                  <ProfileImage src={comment.image} alt="작성자 이미지" />
                  <NickNameContainer>
                    <NickName>{comment.nickname}</NickName>
                    <UpDatedAt>{comment.updatedAt}</UpDatedAt>
                  </NickNameContainer>
                </ProfileContainer>
                <Divider />
              </div>
            ))}
          </CommentListContainer>
        </>
      )}
    </>
  );
}
export default CommentList;

const NoneCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  @media (max-width: 1199px) {
    width: 696px;
  }
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const NoneCommentsText = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #9ca3af;
  margin: 30px 0 0px;
  text-align: center;
`;
const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1200px;
  margin: 0 auto;
  @media (max-width: 1199px) {
    width: 696px;
  }
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const Content = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #1f2937;
  margin: 20px 0;
`;
const ProfileContainer = styled.div`
  display: flex;
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;
const NickNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const NickName = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4b5563;
`;
const UpDatedAt = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9ca3af;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 16px 0;
`;
const Dots = styled.img`
  margin: 0 10px 0 auto;
`;
