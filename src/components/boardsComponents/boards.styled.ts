import { css } from "@/styled-system/css";
import { hstack } from "@/styled-system/patterns";

export const boardsContainer = css({
  p: { base: "16px", md: "24px" },
  maxW: "1248px",
  m: "auto",
});

export const bestPostContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: { base: "16px", md: "24px" },
  mt: { base: "16px", md: "24px" },
});

export const bestPostCardContainer = css({
  gap: "16px",
  display: "flex",
  flexDir: "column",
  minW: { base: "340px", xl: "384px" },
  w: "full",
  minH: "169px",
  px: "24px",
  bg: "gray.50",
});

export const normalPostContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  w: "full",
});

export const normalPostCardContainer = css({
  display: "flex",
  flexDir: "column",
  maxH: "136px",
  pb: "24px",
  borderBottom: "1px solid #E5E7EB",
  gap: "16px",
});

export const articleTextStyle = css({
  minHeight: "74px",
  fontSize: { base: "18px", md: "20px" },
  fontWeight: "600",
  lineHeight: { base: "21px", md: "24px" },
  flexGrow: "1",
});

export const articleImageStyle = css({
  w: "72px",
  h: "72px",
  p: "14px 12px",
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
});

export const PostCardFooter = hstack({
  gap: "8px",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "17px",
  color: "#4B5563",
});
