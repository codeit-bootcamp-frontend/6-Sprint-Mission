import React, { useState } from "react";
import styles from "@/styles/DropdownMenu.module.css";
import Image from "next/image";
import arrowdown from "@/public/icon/ic_arrowdown.svg";
import sort from "@/public/icon/ic_sort.svg";
import { DropDownProps, SelectedOption } from "@/types/type";

export default function DropdownMenu({ orderBySort }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<SelectedOption>("recent");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: SelectedOption) => {
    setSelectedOption(value);
    orderBySort(value);
  };

  const getOptionText = (option: SelectedOption): string => {
    return option === "recent" ? "최신순" : "좋아요순";
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles["dropdown-toggle"]}>
        <div>{getOptionText(selectedOption)}</div>{" "}
        <Image
          className={styles["dropdown-toggle-img"]}
          width={24}
          height={24}
          src={arrowdown}
          alt="드롭다운 화살표"
        />
        <Image
          className={styles["dropdown-toggle-mob"]}
          width={24}
          height={24}
          src={sort}
          alt="모바일 드롭다운"
        />
      </button>
      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          <div
            onClick={() => handleOptionClick("recent")}
            className={styles["dropdown-item"]}
          >
            최신순
          </div>
          <div
            onClick={() => handleOptionClick("like")}
            className={styles["dropdown-item"]}
          >
            좋아요순
          </div>
        </div>
      )}
    </div>
  );
}
