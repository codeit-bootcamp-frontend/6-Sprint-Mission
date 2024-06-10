import React, { useState } from "react";
import { OrderBy } from "../../../types/articleResponseTypes";
interface DropdownMenuProps {
  onSortSelection: (sortOption: OrderBy) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onSortSelection }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <h1 onClick={toggleDropdown}>드롭다운 메뉴</h1>

      {isDropdownVisible && (
        <div>
          <h1
            onClick={() => {
              onSortSelection("recent");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </h1>
          <h1
            onClick={() => {
              onSortSelection("like");
              setIsDropdownVisible(false);
            }}
          >
            인기순
          </h1>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
