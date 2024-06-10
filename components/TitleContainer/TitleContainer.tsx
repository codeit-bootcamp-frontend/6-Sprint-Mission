import { ChildrenProps } from "types/type";
import * as S from "./TitleContainerStyles";

export default function TitleContainer({ children }: ChildrenProps) {
  return (
    <S.TitleContainer>
      {children}
    </S.TitleContainer>
  );
}
