import { Button } from "types/type";
import * as S from "./RoundButtonStyles";

export default function RoundButton({ children, type="button" }: Button) {
  return (
    <>
      <S.RoundButton type={type} >
          {children}
      </S.RoundButton>
    </>
  )
}