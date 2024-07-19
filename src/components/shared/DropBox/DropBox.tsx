import { css } from "@/styled-system/css";
import { MouseEventHandler } from "react";
import { dropBoxContainer, dropBoxTextStyle } from "./dropBox.styled";

interface DropBoxProps {
  open?: boolean;
  toggle?: MouseEventHandler<HTMLDivElement>;
  recent?: MouseEventHandler<HTMLDivElement>;
  like?: MouseEventHandler<HTMLDivElement>;
}

function DropBox({ open = false, toggle, recent, like }: DropBoxProps) {
  return (
    <>
      {open && (
        <div className={dropBoxContainer} onClick={toggle}>
          <p
            className={`${dropBoxTextStyle} ${css({ borderBottom: "1px solid #E5E7EB" })}`}
            onClick={recent}
          >
            최신순
          </p>
          <p className={dropBoxTextStyle} onClick={like}>
            좋아요순
          </p>
        </div>
      )}
    </>
  );
}

export default DropBox;
