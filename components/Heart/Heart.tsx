import * as S from "./HeartStyles";
import { ArticleProps } from "types/type";

export default function Heart({ article }: ArticleProps) {
  return (
    <S.HeartContainer>
    <S.HeartIcon width={20} height={17} />
    <S.HeartNumber>{article?.likeCount}</S.HeartNumber>
  </S.HeartContainer>
  )
}