import React, { FC, useState, useEffect, useRef } from "react";
import "../../style/SelectBtn.css";
import ArrowDownIcon from "../../assets/icon/ic_arrow_down.svg";
import sortBtn from "../../assets/icon/ic_sort.svg";
import { useMediaQuery } from "react-responsive";

interface SelectBtnProps {
  onChange: (order: string) => void;
}

const SelectBtn: FC<SelectBtnProps> = ({ onChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [order, setOrder] = useState("recent");
  const ORDER_KR: { [key: string]: string } = {
    recent: "최신순",
    favorite: "좋아요순",
  };
  

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const handleMobileChange = () => {
    if (isMobile)
      return <img className="img-arrow" src={sortBtn} alt="arrow-down" />;
    else
      return (
        <>
          <span>{ORDER_KR[order]}</span>
          <img src={ArrowDownIcon} alt="arrow-down" />
        </>
      );
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // 정렬 옵션 선택시 호출되는 함수
  const handleOrderChange = (order: string) => {
    setOrder(order); // 상태 업데이트
    onChange(order); // 부모 컴포넌트로 선택된 정렬 순서 전달
    setDropdownOpen(false); // 드롭다운 닫기
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown_button" onClick={toggleDropdown}>
        <div className="select">{handleMobileChange()}</div>
      </div>
      {isDropdownOpen && (
        <ul className="dropdown_contents">
          <li onClick={() => handleOrderChange("recent")}>최신순</li>
          <li onClick={() => handleOrderChange("favorite")}>좋아요순</li>
        </ul>
      )}
    </div>
  );
};

export default SelectBtn;
