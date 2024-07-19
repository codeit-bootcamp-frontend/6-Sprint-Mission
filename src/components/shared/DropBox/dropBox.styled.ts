import { center, vstack } from "@/styled-system/patterns";

export const dropBoxContainer = vstack({
  bg: "white",
  gap: 0,
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  width: { base: "120px", xl: "130px" },
  cursor: "pointer",
});

export const dropBoxTextStyle = center({
  height: "42px",
  width: "full",
});
