import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import kebab from "assets/icon/ic_kebab.svg";
import defaultProfile from "assets/icon/profile.svg";
import formatTimeAgo from "utils/formatTimeAgo";
import CommentType from "models/comment";
import COLORS from "styles/palette";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "contexts/atom/user";
import Dropdown from "components/Dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, editComment } from "api/comment";

export default function Comment({ data }: { data: CommentType }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    id,
    content,
    updatedAt,
    writer: { nickname, image, id: writerId },
  } = data;
  const userInfo = useAtomValue(userInfoAtom);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment-list"] });
    },
  });

  const closeEditForm = () => {
    setIsEditing(false);
  };

  return (
    <CommentContainer>
      <StyledContent>
        {isEditing ? (
          <EditForm
            initialValue={content}
            close={closeEditForm}
            commentId={id}
          />
        ) : (
          <>
            <span>{content}</span>
            {userInfo && userInfo.id === writerId && (
              <Dropdown.Root>
                <Dropdown.Toggle>
                  <img src={kebab} alt="kebab" />
                </Dropdown.Toggle>

                <Dropdown.List>
                  <Dropdown.Item
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    수정하기
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      deleteMutation.mutate();
                    }}
                  >
                    삭제하기
                  </Dropdown.Item>
                </Dropdown.List>
              </Dropdown.Root>
            )}
          </>
        )}
      </StyledContent>

      <ProfileContainer>
        <ProfileImg src={image ?? defaultProfile} alt="profile-img" />
        <span className="username">{nickname}</span>
        <span className="updated-time">{formatTimeAgo(updatedAt)}</span>
      </ProfileContainer>
    </CommentContainer>
  );
}

interface EditFormProps {
  initialValue: string;
  close: () => void;
  commentId: number;
}

function EditForm({ initialValue, close, commentId }: EditFormProps) {
  const [content, setContent] = useState(initialValue);
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (content: string) => editComment({ commentId, content }),
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({ queryKey: ["comment-list"] });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setContent(value);
  };

  const handleEditComment = () => {
    if (!content) return;

    editMutation.mutate(content);
  };

  return (
    <StyledEditForm>
      <EditTextarea value={content} onChange={handleChange} />
      <ButtonContainer>
        <button type="button" onClick={close}>
          취소
        </button>
        <button type="button" onClick={handleEditComment}>
          수정
        </button>
      </ButtonContainer>
    </StyledEditForm>
  );
}

const StyledEditForm = styled.form`
  width: 100%;
`;

const EditTextarea = styled.textarea`
  display: block;
  width: 100%;
  outline: none;
  border: none;
  background-color: ${COLORS.COOL_GRAY_300};
  border-radius: 12px;
  padding: 16px 24px;
`;

const ButtonContainer = styled.div`
  text-align: right;
  margin-top: 8px;

  & button {
    text-decoration: underline;
  }

  & button:last-child {
    margin-left: 8px;
    margin-right: 2px;
    color: ${COLORS.BLUE};
  }
`;

const CommentContainer = styled.div`
  border-bottom: 1px solid ${COLORS.GRAY_200};
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: ${COLORS.COOL_GRAY_800};
    font-weight: 400;
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileContainer = styled.div`
  margin: 24px 0;
  width: max-content;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 8px;

  ${ProfileImg} {
    grid-row: 1 / span 2;
  }

  .username {
    font-weight: 400;
    font-size: 14px;
    color: ${COLORS.COOL_GRAY_600};
  }

  .updated-time {
    font-weight: 400;
    font-size: 12px;
    color: ${COLORS.LIGHT_GRAY};
  }
`;
