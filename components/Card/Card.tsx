import Heart from "components/Heart"
import formatDate from 'utils/formatData';
import Image from "next/image";
import Badge from "public/image/image_badge.png";
import * as S from "./CardStyles";
import { Articles } from "types/type";

export default function Card({ articles }: Articles) {
  return (
    <S.CardList>
      {articles?.map((article) => (
        <S.CardItem key={article.id}>
          <S.CardLayout>
            <S.BadgeImage
              src={Badge}
              width={120}
              height={30}
              alt="베스트 상품 뱃지"
            />
            <S.Container>
              <S.ContentContainer>
                <S.Content>{article.title}</S.Content>
                {article.image && (
                  <S.ImageContainer>
                    <Image
                      src={article.image}
                      width={48}
                      height={44}
                      alt={article.title}
                    />
                  </S.ImageContainer>
                )}
              </S.ContentContainer>
              <S.Footer>
                <S.NickName>{article.writer?.nickname}</S.NickName>
                <S.HeartContainer>
                  <S.HeartIcon width={11} height={13} />
                  <S.HeartNumber>{article.likeCount}</S.HeartNumber>
                </S.HeartContainer>
                <S.CreatedDate>{formatDate(new Date(article.createdAt))}</S.CreatedDate>
              </S.Footer>
            </S.Container>
          </S.CardLayout>
        </S.CardItem>
      ))}
    </S.CardList>
  );
}
