import { css } from "@/styled-system/css";
import { hstack } from "@/styled-system/patterns";

export const headerContainer = hstack({
  gap: 0,
  padding: "10px 16px",
  position: "sticky",
  bg: "white",
  top: "0px",
  px: { base: "16px", md: "24px", xl: "200px" },
  borderBottom: "1px solid #DFDFDF",
});

export const headerTitle = css({
  mr: { base: "16px", md: "28px", xl: "40px" },
  color: "blueBasic",
  fontSize: { base: "20px", md: "27px" },
  fontWeight: "bold",
  lineHeight: { base: "27px", md: "34px" },
});

export const navContainer = hstack({
  flexGrow: "1",
  gap: { base: "8px", md: "20px" },
  fontSize: { base: "16px", md: "18px" },
  lineHeight: "21px",
  fontWeight: "bold",
});

export const navTextIsActive = (isActive: boolean) =>
  isActive ? css({ color: "blueBasic" }) : css({ color: "textBasic" });
