import { css } from "@/styled-system/css";
import { hstack, vstack } from "@/styled-system/patterns";

export const formBasicStyle = vstack({
  w: "full",
  maxWidth: "640px",
  mt: { base: "24px", md: "40px" },
  m: "auto",
  gap: "24px",
});

export const labelInputContainer = css({
  display: "flex",
  flexDir: "column",
  w: "full",
});

export const labelBasicStyle = css({
  color: "#1F2937",
  fontSize: "18px",
  fontWeight: "bold",
});

export const socialLoginStyle = hstack({
  bg: "#E6F2FF",
  w: "full",
  justifyContent: "space-between",
  px: "24px",
  h: "74px",
});
