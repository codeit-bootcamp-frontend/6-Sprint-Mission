import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Button } from "@/styles/CommonStyles";
import BoardCommentThread from "@/components/addBoard/BoardCommentThread";

const COMMENT_PLACEHOLDER = "댓글을 입력해주세요.";

const CommentInputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  height: 104px;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-size: 14px;
    line-height: 24px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 16px;
    }
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.blue.primary};
  }
`;

const PostCommentButton = styled(Button)`
  align-self: flex-end;
  font-weight: 600;
  font-size: 14px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 16px;
  }
`;

interface ItemCommentSectionProps {
  articleId: number;
}

const BoardCommentSection: React.FC<ItemCommentSectionProps> = ({
  articleId,
}) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {};

  return (
    <>
      <CommentInputSection>
        <SectionTitle>댓글 달기</SectionTitle>

        <TextArea
          placeholder={COMMENT_PLACEHOLDER}
          value={comment}
          onChange={handleInputChange}
        />

        <PostCommentButton
          onClick={handlePostComment}
          disabled={!comment.trim()}
        >
          등록
        </PostCommentButton>
      </CommentInputSection>

      <BoardCommentThread articleId={articleId} />
    </>
  );
};

export default BoardCommentSection;
