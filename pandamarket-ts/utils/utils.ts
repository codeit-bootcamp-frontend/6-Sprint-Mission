// utils/formatDate.ts

import { format } from "date-fns";

export const formatDate = (isoString: Date) => {
  const date = new Date(isoString);
  return format(date, "yyyy.MM.dd");
};
