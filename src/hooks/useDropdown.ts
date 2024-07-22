import { useEffect, useRef, useState } from "react";

interface UseDropdownProps {
  initialVisible?: boolean;
  onClickOutside?: (event: MouseEvent) => void;
}

export function useDropdown({
  initialVisible = false,
  onClickOutside,
}: UseDropdownProps) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
      if (onClickOutside) {
        onClickOutside(event);
      }
    }
  };

  const handleItemClick = (onItemClick: () => void) => {
    if (onItemClick) {
      onItemClick();
    }
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    isVisible,
    toggleDropdown,
    dropdownRef,
    handleItemClick,
  };
}
