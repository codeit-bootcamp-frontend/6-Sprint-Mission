import { cva } from "@/styled-system/css";

export const inputRecipe = cva({
  base: {
    bg: "#F3F4F6",
    borderRadius: "12px",
    w: "full",
    h: "56px",
    p: "16px 24px",
    fontSize: "18px",
    scrollbar: "hidden",
    "&:focus": {
      outline: "none",
    },
  },
  variants: {
    visual: {
      banner: {
        borderRadius: { base: "24px", md: "46px" },
        width: { base: "154px", md: "355px" },
        height: { base: "48px", md: "60px" },
      },
      search: {
        p: "9px 44px",
        h: "full",
      },
      large: {
        h: "104px",
      },
      xLarge: {
        h: "282px",
      },
    },
  },
});
