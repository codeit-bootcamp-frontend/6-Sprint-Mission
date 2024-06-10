import { useState } from "react";
import styled from "styled-components";
import SortIcon from "@/public/images/icons/ic_sort.svg";
import Image from "next/image";

const SortButtonWrapper = styled.div`
  position: relative;
`;

const SortDropdownTriggerButton = styled.button`
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 9px;
  margin-left: 8px;
`;

const DropdownMenuContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 99;
`;

const DropdownItem = styled.div`
  padding: 12px 44px;
  border-bottom: 1px solid var(--gray-200);
  font-size: 16px;
  color: var(--gray-800);
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

interface DropdownMenuProps {
  onSortSelection: (sortOption: any) => void;
  sortOptions: { key: string; label: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onSortSelection,
  sortOptions,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <SortButtonWrapper>
      <SortDropdownTriggerButton onClick={toggleDropdown}>
        <Image src={SortIcon} alt="정렬아이콘" width={15} height={7} />
      </SortDropdownTriggerButton>

      {isDropdownVisible && (
        <DropdownMenuContainer>
          {sortOptions.map((option) => (
            <DropdownItem
              key={option.key}
              onClick={() => {
                onSortSelection(option.key);
                setIsDropdownVisible(false);
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenuContainer>
      )}
    </SortButtonWrapper>
  );
};

export default DropdownMenu;
