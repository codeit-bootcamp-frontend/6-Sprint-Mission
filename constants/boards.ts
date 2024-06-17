import { DEVICE } from "./Device";

export const IMAGE_DOMAIN_ALLOWED =
  "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com";

export const NUM_BEST_ARTICLES = {
  [DEVICE.MOBILE]: 1,
  [DEVICE.TABLET]: 2,
  [DEVICE.PC]: 3,
};

export const ORDER = {
  RECENT: "recent",
  LIKE: "like",
} as const;
export type Order = (typeof ORDER)[keyof typeof ORDER];

export const ORDER_MESSAGE = {
  [ORDER.RECENT]: "최신순",
  [ORDER.LIKE]: "좋아요순",
};
