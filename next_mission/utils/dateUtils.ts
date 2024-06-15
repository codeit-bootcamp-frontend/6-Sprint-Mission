import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';

export const formatUpdatedAt = (dateString: Date) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInDays = differenceInDays(now, date);
  const diffInHours = differenceInHours(now, date);
  const diffInMinutes = differenceInMinutes(now, date);
  const diffInSeconds = differenceInSeconds(now, date);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`
  } else {
    return format(date, "yyyy.MM.dd hhLmm a")
  }
}