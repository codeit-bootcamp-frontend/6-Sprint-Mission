import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../api/itemApi";
import EmptyLogo from "../../../assets/images/logo/commentEmpty.png";
import styled from "styled-components";

interface Writer {
  image: string;
  nickname: string;
}

interface Comment {
  id: number;
  content: string;
  writer: Writer;
  updatedAt: string;
}

function ItemComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const { itemId } = useParams();
  const CommentsLoad = async (itemId: number) => {
    const result = await getComments(itemId);
    setComments(result.list);
  };

  useEffect(() => {
    if (itemId) {
      CommentsLoad(Number(itemId));
    }
  }, [itemId]);

  // timeAgo 나중에 따로 파일로 관리 할 예정입니다...ㅜ
  const timeAgo = (date: string) => {
    const now = new Date();
    const updatedAt = new Date(date);
    const difference =  now.getTime() - updatedAt.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds}초 전`;
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    if (weeks < 4) return `${weeks}주 전`;
    if (months < 12) return `${months}개월 전`;
    return `${years}년 전`;
  };
  return (
    <Container>
      {comments && comments.length > 0 ? (
        <CommentsArea>
          {comments.map(item => (
            <UserCommentsArea key={item.id}>
              <CommentContent>{item.content}</CommentContent>
              <AskUserArea>
                <UserImg src={item.writer.image} alt="userimage" />
                <UserInfo>
                  <UserName>{item.writer.nickname}</UserName>
                  <Time>{timeAgo(item.updatedAt)}</Time>
                </UserInfo>
              </AskUserArea>
            </UserCommentsArea>
          ))}
        </CommentsArea>
      ) : (
        <NoAskArea>
          <img src={EmptyLogo} alt="EmptyLogo" />
          <NoAsk>아직 문의가 없습니다.</NoAsk>
        </NoAskArea>
      )}
    </Container>
  );
}
const NoAskArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NoAsk = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #9ca3af;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const UserImg = styled.img`
  width: 40px;
  height: 40px;
`;
const CommentsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const UserCommentsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
`;
const CommentContent = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
`;
const AskUserArea = styled.div`
  display: flex;
  gap: 8px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const UserName = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
`;
const Time = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: #9ca3af;
`;

export default ItemComments;
