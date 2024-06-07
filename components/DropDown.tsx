import React, { useState } from "react";

interface DropDownProps {
  order?: string;
  onChangeOrder: (order: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  order = "recent",
  onChangeOrder,
}) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [localOrder, setLocalOrder] = useState(order);

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };
  const handleOptionClick = (order: string) => {
    setLocalOrder(order);
    onChangeOrder(order);
    setIsDropDown(false);
  };

  return (
    <>
      <div onClick={handleDropDown}>
        {localOrder == "recent" ? "최신순" : "좋아요순"}
      </div>
      {isDropDown && (
        <div>
          <div onClick={() => handleOptionClick("recent")}>최신순</div>
          <div onClick={() => handleOptionClick("like")}>좋아요순</div>
        </div>
      )}
    </>
  );
};

export default DropDown;
