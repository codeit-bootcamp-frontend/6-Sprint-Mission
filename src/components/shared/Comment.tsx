import Image from "next/image";
import userIcon from "@/assets/icons/user_passive_ic.svg";
import addlockIcon from "@/assets/icons/addlock-ic.svg";
import formatDateString from "@/utils/formatDate";
import { hstack, vstack } from "@/styled-system/patterns";
import { css } from "@/styled-system/css";
import { commentStyle, looKIconStyle } from "./comment.style";
import { dateText, nameText } from "@/css/common/text.styled";

export interface CommentInp {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image?: string;
  };
}

function Comment({ comment }: { comment: CommentInp }) {
  const { content, createdAt, writer } = comment;
  const CommentDate = formatDateString(createdAt);

  return (
    <div className={commentStyle}>
      <p>{content}</p>
      <div className={hstack()}>
        <Image width={32} src={userIcon} alt="유저얼굴" />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          })}
        >
          <p className={nameText}>{writer.nickname}</p>
          <p className={dateText}>{CommentDate}</p>
        </div>
      </div>
      <Image src={addlockIcon} alt="더보기..." className={looKIconStyle} />
    </div>
  );
}

export default Comment;
