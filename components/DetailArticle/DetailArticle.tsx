import Image from "next/image";
import UserInfo from "components/UserInfo";
import HeartContainer from "components/Heart";
import HorizonLine from "components/HorizonLine";
import { ArticleProps } from "types/type";
import * as S from "./DetailArticleStyles";

export default function DetailArticle({ article }: ArticleProps) {
  return (
    <>
      <S.DetailArticleLayout>
        <S.Header>
          <S.ContentContainer>
            <S.Content>{article.title}</S.Content>
            {article.image && (
              <Image
                src={article.image}
                width={150}
                height={150}
                alt="상세 페이지 사진"
              />
            )}
          </S.ContentContainer>
          <S.KebabIcon width={24} height={24} />
        </S.Header>
        <S.Footer>
          <S.UserInfoContainer>
            <UserInfo article={article} />
          </S.UserInfoContainer>
          <S.VerticalLine />
          <HeartContainer article={article} />
        </S.Footer>
        <HorizonLine />
        <S.Paragraph>{article.content}</S.Paragraph>
      </S.DetailArticleLayout>
    </>
  );
}
