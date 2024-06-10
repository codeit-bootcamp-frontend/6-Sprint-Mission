const windowSize = {
  mobile: "screen and (min-width: 375px)",
  tablet: "screen and (min-width: 744px)",
  desktop: "screen and (min-width: 1200px)",
};

const fontSize = {
  xxs: "1.2rem",
  xs: "1.4rem",
  sm: "1.6rem",
  base: "1.8rem",
  md: "2rem",
};

const colorPalette = {
  background: "#fff", // 전체 배경 색상
  fontPrimary: "#111827", // 주요 텍스트 색상 (게시글 제목 등)
  fontSecondary: "#4B5563", // 부차적 텍스트 색상 (게시글 날짜 등)
  primary: "#3692FF", // 주요 UI 색상 (베스트 게시글, 버튼 등)
  secondary: "#F9FAFB", // 부차적 UI 색상 (카드 배경 등)
  tertiary: "#E5E7EB", 
  inputBackgroundColor: "#F3F4F6",
  inputPlaceholderColor: "#9CA3AF"
};

const theme = {
  windowSize,
  fontSize,
  colorPalette,
};

export default theme;
