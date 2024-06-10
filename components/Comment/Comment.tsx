import Image from "next/image";
import Profile from "public/icon/ic_profile.png";
import HorizonLine from "components/HorizonLine";
import formatDate from "utils/formatData";
import * as S from "./CommentStyles";
import { Comments } from "types/type";

export default function Comment({ comments }: Comments) {
  return (
    <S.CommentsContainer>
    {comments?.map(comment => (
      <S.Comment key={comment?.id}>
        <S.CommentHeader>
          <S.CommentContent>{comment?.content}</S.CommentContent>
          <S.KebabIcon width={24} height={24} />
        </S.CommentHeader>
        <S.CommentFooter>
          <Image src={Profile} width={40} height={40} alt="프로필 사진" />
          <S.UserInfo>
            <S.UserName>{comment?.writer?.nickname}</S.UserName>
            <S.CommentTime>{formatDate(new Date(comment.createdAt))}</S.CommentTime>
          </S.UserInfo>
        </S.CommentFooter>
        <HorizonLine />
      </S.Comment>
    ))}
  </S.CommentsContainer>
  );
}