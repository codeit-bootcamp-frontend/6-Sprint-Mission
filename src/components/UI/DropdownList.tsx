import React from "react";
import "./DropdownList.css";

interface DropdownListProps {
  onSortSelection: (sortType: string) => void;
}

function DropdownList({ onSortSelection }: DropdownListProps) {
  return (
    <div className="dropdownList">
      <div className="dropdownItem" onClick={() => onSortSelection("recent")}>
        최신순
      </div>
      <div className="dropdownItem" onClick={() => onSortSelection("favorite")}>
        인기순
      </div>
    </div>
  );
}
export default DropdownList;
