import React from "react";
import { useDropdown } from "@/hooks/useDropdown";
import PrimaryDropdown from "./PrimaryDropdown";

const DropdownWrapper = ({
  className = "",
  children,
  options,
}: {
  className?: string;
  children: React.ReactNode;
  options?: {
    initialVisible: boolean;
    onClickOutside: (event: MouseEvent) => void;
  };
}) => {
  const { isVisible, toggleDropdown, dropdownRef, handleItemClick } =
    useDropdown(options || {});

  return (
    <div
      className={`relative focus:outline-none ${className}`}
      ref={dropdownRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // DropdownButton에 toggleDropdown 함수 전달
          if (child.type === DropdownButton) {
            return React.cloneElement(child, {
              isVisible: isVisible,
              toggleDropdown: toggleDropdown,
            } as DropdownButtonType);
          }
          // DropdownContent에 isVisible 상태 전달
          if (child.type === DropdownContent) {
            return React.cloneElement(child, {
              isVisible: isVisible,
              handleItemClick: handleItemClick,
            } as DropdownContentType);
          }
          return child;
        }
        return null;
      })}
    </div>
  );
};

type DropdownButtonType = {
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  isVisible?: boolean;
  toggleDropdown?: () => void;
};

const DropdownButton = ({
  className = "",
  activeClassName = "",
  children,
  isVisible, // DropdownWrapper에서 전달되는 prop(from useDropdown)
  toggleDropdown, // DropdownWrapper에서 전달되는 prop(from useDropdown)
}: DropdownButtonType) => {
  const visibleDropdownStyle = isVisible ? activeClassName : "";

  return (
    <button
      className={`${className} ${visibleDropdownStyle}`}
      onClick={toggleDropdown}>
      {children}
    </button>
  );
};

type DropdownContentType = {
  className?: string;
  isVisible?: boolean;
  children: React.ReactNode;
  handleItemClick?: () => void;
};

const DropdownContent = ({
  className,
  isVisible, // DropdownWrapper에서 전달되는 prop(from useDropdown)
  children,
  handleItemClick, // DropdownWrapper에서 전달되는 prop(from useDropdown)
}: DropdownContentType) => {
  if (!isVisible) return null;

  return (
    <div className={`absolute top-full z-dropdown ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === DropdownItem) {
            return React.cloneElement(child, {
              handleItemClick: handleItemClick,
            } as DropdownItemProps);
          }
          return child;
        }
        return null;
      })}
    </div>
  );
};

export type DropdownItemProps = {
  className?: string;
  children: React.ReactNode | string;
  value: string;
  onSelect?: () => void;
  handleItemClick?: (onClick: () => void) => void;
  [key: string]: unknown;
};
const DropdownItem = ({
  className,
  children,
  value,
  onSelect = () => {},
  handleItemClick, // DropdownWrapper에서 전달되는 prop(from useDropdown)
  ...rest
}: DropdownItemProps) => {
  const handleClick = () => {
    if (handleItemClick && onSelect) handleItemClick(onSelect);
  };

  return (
    <button
      className={`block ${className}`}
      onClick={handleClick}
      value={value}
      {...rest}>
      {children}
    </button>
  );
};

const Dropdown = Object.assign(DropdownWrapper, {
  Button: DropdownButton,
  Content: DropdownContent,
  Item: DropdownItem,
  Primary: PrimaryDropdown,
});

export default Dropdown;
