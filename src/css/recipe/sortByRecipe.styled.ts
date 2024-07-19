import { cva } from "@/styled-system/css";

export const sortByRecipe = cva({
  base: {
    h: "42px",
    w: "42px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
  },
  variants: {
    visual: {
      pc: {
        gap: { base: "14px", xl: "24px" },
        w: { base: "120px", xl: "130px" },
      },
    },
  },
});
