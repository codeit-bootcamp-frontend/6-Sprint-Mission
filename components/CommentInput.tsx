import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

interface RegisterButtonProps {
  isEnabled: boolean;
}

function CommentInput(): JSX.Element {
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.target.value);
  };

  const isCommentValid = comment.trim() !== "";
  return (
    <Section>
      <Text>문의하기</Text>
      <InputArea
        value={comment}
        onChange={handleInputChange}
        placeholder="댓글을 입력해주세요."
      />
      <RegisterButton isEnabled={isCommentValid}>등록</RegisterButton>
    </Section>
  );
}
export default CommentInput;

const Section = styled.div`
  width: 1200px;
  margin: 0 auto;
  @media (max-width: 1199px) {
    width: 696px;
  }
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const Text = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #111827;
  margin: 40px 0 0 0;
`;
const InputArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 10px;
  width: 100%;
  height: 104px;
  background: #f3f4f6;
  border-radius: 12px;
  border: none;
  margin: 10px 0;
  &::placeholder {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`;
const RegisterButton = styled.button<RegisterButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 23px;
  gap: 10px;
  width: 74px;
  height: 42px;
  border-radius: 8px;
  margin: 0 0 0 auto;
  border: none;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  background-color: ${({ isEnabled }) => (isEnabled ? "#3692FF" : "#9ca3af")};
  cursor: ${({ isEnabled }) => (isEnabled ? "pointer" : "not-allowed")};
`;
