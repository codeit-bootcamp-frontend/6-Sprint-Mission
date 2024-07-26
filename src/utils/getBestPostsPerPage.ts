const bestPostsPerPageMap: {
  [key in "desktop" | "tablet" | "mobile"]: number;
} = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
};

export default function getBestPostsPerPage(screenSize: string): number {
  return (
    bestPostsPerPageMap[screenSize as "desktop" | "tablet" | "mobile"] ?? 3
  );
}
