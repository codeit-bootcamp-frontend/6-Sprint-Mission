export default function TimeString(time: string | number | Date): string {
  const currentDate = new Date();
  const createdDate = new Date(time);

  const timeDiff = currentDate.getTime() - createdDate.getTime();

  const hoursDiff = timeDiff / (1000 * 60 * 60);
  const daysDiff = hoursDiff / 24;
  const monthsDiff = daysDiff / 30;

  if (monthsDiff >= 1) {
    return Math.floor(monthsDiff) + "달 전";
  } else if (daysDiff >= 1) {
    return Math.floor(daysDiff) + "일 전";
  } else if (hoursDiff >= 1) {
    return Math.floor(hoursDiff) + "시간 전";
  } else {
    return "방금 전";
  }
}
