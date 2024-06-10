import Image from "next/image";
import UserInfo from "components/UserInfo";
import Heart from "components/Heart";
import * as S from "./PostStyles";
import { Articles } from "types/type";

export default function Post({ articles }: Articles) {
  return (
    <S.PostList>
      {articles?.map((article) => (
        <S.PostItem key={article.id}>
          <S.PostLayout>
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
                <UserInfo article={article} />
                <Heart article={article}/>
              </S.Footer>
            </S.Container>
          </S.PostLayout>
        </S.PostItem>
      ))}
    </S.PostList>
  );
}
