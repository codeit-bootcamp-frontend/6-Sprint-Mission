export const ORDER_TYPE_DICT = {
  recent: '최신순',
  favorite: '좋아요순',
} as const;

export type OrderType = keyof typeof ORDER_TYPE_DICT;
