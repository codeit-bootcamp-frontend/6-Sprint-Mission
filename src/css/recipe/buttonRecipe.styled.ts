import { cva } from "@/styled-system/css";

export const buttonRecipe = cva({
  base: {
    color: "white",
    bg: "blueBasic",
    width: "128px",
    height: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    cursor: "pointer",
  },
  variants: {
    visual: {
      banner: {
        borderRadius: { base: "24px", md: "46px" },
        width: { base: "154px", md: "355px" },
        height: { base: "48px", md: "60px" },
      },
      sign: {
        bg: "disabledBasic",
        width: "full",
        height: "56px",
        borderRadius: "40px",
      },
      small: {
        width: "88px",
        height: "42px",
      },
      smallDisabled: {
        bg: "disabledBasic",
        width: "88px",
        height: "42px",
      },
      large: {
        w: "240px",
        h: "48px",
        borderRadius: "40px",
        gap: "10px",
        margin: "auto",
      },
    },
    active: {
      true: {
        backgroundColor: "blueBasic",
      },
    },
  },
});
