import { ReactNode } from "react";
import * as S from "./Dropdown.style";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export default function Item({ children, onClick }: Props) {
  return <S.DropdownItem onClick={onClick}>{children}</S.DropdownItem>;
}
