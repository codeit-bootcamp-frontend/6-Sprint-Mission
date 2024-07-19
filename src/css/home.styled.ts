import { css } from "@/styled-system/css";

export const bannerTitle = css({
  fontSize: { base: "32px", md: "40px" },
  lineHeight: { base: "44px", md: "56px" },
  textAlign: { base: "center", xl: "left" },
  fontWeight: "bold",
  color: "textBasic",
});
const evenSectionContainer = {
  flexDirection: { base: "column", xl: "row-reverse" },
  alignItems: { base: "right", xl: "center" },
};

export const sectionContainer = (index: number) =>
  css({
    display: "flex",
    gap: { base: "20px", xl: "64px" },
    flexDirection: { base: "column", xl: "row" },
    alignItems: { base: "left", xl: "center" },
    ...(index % 2 === 1 && evenSectionContainer),
  });

const evenSectionInformation = {
  textAlign: "right",
};

export const sectionInformation = (index: number) =>
  css({
    textAlign: "left",
    ...(index % 2 === 1 && evenSectionInformation),
  });

export const itemTextStyle = css({
  color: "blueBasic",
  fontSize: "16px",
  lineHeight: "22px",
  fontWeight: "bold",
});

export const titleTextStyle = css({
  fontSize: { base: "24px", md: "32px", xl: "40px" },
  lineHeight: { base: "32px", md: "44px", xl: "56px" },
  fontWeight: "bold",
  mt: { base: "8px", md: "12px" },
  mb: { base: "20px", xl: "24px" },
});

export const DescriptionTextStyle = css({
  fontSize: { base: "16px", md: "18px", xl: "24px" },
  lineHeight: { base: "25px", md: "22px", xl: "28px" },
  fontWeight: 500,
});
