export const DEVICE = {
  MOBILE: "mobile",
  TABLET: "tablet",
  PC: "PC",
} as const;

export type Device = (typeof DEVICE)[keyof typeof DEVICE];
