import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { OrderByListType } from "../types/common.interface";
import { GetArticlesQuery } from "@/pages/boards";
import toggleIcon from "@/public/icons/toggle_icon.svg";

type PropsType = {
  list: OrderByListType[];
  setOption: React.Dispatch<React.SetStateAction<GetArticlesQuery>>;
};

const Dropdown = ({ list, setOption }: PropsType) => {
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState(list[0].text);

  const handleDropDownClick = () => {
    setView(!view);
  };

  const handleOptionClick = (key: "recent" | "like") => () => {
    setOption({
      orderBy: `${key}`,
    });
    const selectedItem = list.find((item) => item.key === key);
    if (selectedItem) {
      setSelected(selectedItem.text);
    }
    setView(false);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleDropDownClick}
          className="w-[130px] px-5 py-2 cursor-pointer border border-gray-200 rounded-xl flex justify-between"
        >
          <span>{selected}</span>
          <div className="w-6 h-6 flex justify-center items-center">
            <Image src={toggleIcon} alt="더보기" />
          </div>
        </button>
        {view && (
          <>
            <ul className="absolute mt-1 w-[130px] border border-gray-200 rounded-xl bg-white z-[9999]">
              {list?.map((i, index) => {
                return (
                  <li
                    key={index}
                    onClick={handleOptionClick(i.key)}
                    className="cursor-pointer text-center leading-[1.5] py-[9px] border-b border-b-gray-200 last-of-type:border-b-0"
                  >
                    {i.text}
                  </li>
                );
              })}
            </ul>
            <div
              onClick={handleDropDownClick}
              className="fixed w-full h-full top-0 left-0 z-[10] opacity-25"
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default Dropdown;
