import { ReactNode, useContext } from "react";
import { DropdownContext } from "./Root";

export default function Toggle({ children }: { children: ReactNode }) {
  const { toggle } = useContext(DropdownContext);

  return (
    <button type="button" onClick={toggle}>
      {children}
    </button>
  );
}
