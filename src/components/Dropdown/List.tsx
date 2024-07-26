import { ReactNode, useContext } from "react";
import { DropdownContext } from "./Root";
import * as S from "./Dropdown.style";

export default function List({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(DropdownContext);

  return isOpen ? <S.DropdownList>{children}</S.DropdownList> : null;
}
