import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

import { DropdownProps } from "@/types";

import style from "@/styles/dropdown.module.css";
import arrow from "@/public/icon/ic_arrow_down.svg";
import sort from "@/public/icon/ic_sort.svg";

export default function Dropdown({ onChange }: DropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [order, setOrder] = useState<"recent" | "like">("recent");

  const ORDER_KR = {
    recent: "최신순",
    like: "좋아요순",
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const handleMobileChange = () => {
    if (isMobile) return <Image src={sort} alt="arrow-icon" />;
    else
      return (
        <>
          <span>{order === "recent" ? "최신순" : "좋아요순"}</span>
          <Image src={arrow} alt="arrow-icon" />
        </>
      );
  };

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const handleOrderChange = (order: "recent" | "like") => {
    setOrder(order);
    onChange(order as "recent" | "like");
    setDropdownOpen(false);
  };

  const handleDropdownClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [order]);

  return (
    <div className={style.dropdown_container} ref={dropdownContainerRef}>
      <div
        className={`${style.dropdown} ${isDropdownOpen ? style.open : ""}`}
        onClick={handleDropdownClick}
      >
        <div className={style.dropdown_button}>
          <div className={style.select}>
          {handleMobileChange()}
          </div>
          {isDropdownOpen && (
            <ul className={style.dropdown_contents}>
              <li
                className={`${style.dropdown_li} ${
                  order === "recent" ? style.selected : ""
                }`}
                onClick={() => handleOrderChange("recent")}
              >
                최신순
              </li>
              <li
                className={`${style.dropdown_li} ${
                  order === "like" ? style.selected : ""
                }`}
                onClick={() => handleOrderChange("like")}
              >
                좋아요순
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
