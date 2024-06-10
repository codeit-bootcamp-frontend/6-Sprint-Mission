import formatDate from "utils/formatData";
import Profile from "public/icon/ic_profile.png";
import * as S from "./UserInfoStyles";
import { ArticleProps } from "types/type";

export default function UserInfo({ article }: ArticleProps) {
  return (
    <>
      <S.ProfileImage
        src={Profile}
        width={24}
        height={24}
        alt="프로필 이미지"
      />
      <S.NickName>{article?.writer?.nickname}</S.NickName>
      <S.CreatedDate>{formatDate(new Date(article.createdAt))}</S.CreatedDate>
    </>
  );
}
