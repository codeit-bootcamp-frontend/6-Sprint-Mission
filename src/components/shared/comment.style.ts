import { css } from "@/styled-system/css";

export const commentStyle = css({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  minH: "81px",
  borderBottom: "1px solid #DFDFDF",
  gap: "16px",
  py: { base: "16px", md: "24px" },
});

export const looKIconStyle = css({
  position: "absolute",
  top: "30px",
  right: "24px",
});
