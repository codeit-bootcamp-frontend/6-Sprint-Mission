import { Button } from "types/type";
import * as S from "./RectangleButtonStyles";

export default function RectangleButton({ children, disabled, onClick, type="button" }: Button) {
  return (
    <>
      <S.Button type={type} disabled={disabled} onClick={onClick}>
        {children}
      </S.Button>
    </>
  );
}
