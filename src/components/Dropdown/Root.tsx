import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as S from "./Dropdown.style";

export const DropdownContext = createContext({
  isOpen: false,
  toggle: () => {},
});

export default function DropdownRoot({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const contextValue = useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node | null)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownContext.Provider value={contextValue}>
      <S.DropdownContainer ref={dropdownRef}>{children}</S.DropdownContainer>
    </DropdownContext.Provider>
  );
}
