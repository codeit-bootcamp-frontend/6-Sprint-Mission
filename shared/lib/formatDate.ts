export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}. ${month.toString().length === 1 ? "0" + month : month}. ${day.toString().length === 1 ? "0" + day : day}`;
}

export function compareDateWithNow(createdAt: Date) {
  const now = new Date(Date.now());
  if (now.valueOf() - createdAt.valueOf() <= 0) {
    throw new Error();
  }
  const yearDiff = now.getFullYear() - createdAt.getFullYear();
  const monthDiff = now.getMonth() - createdAt.getMonth();
  const dayDiff = now.getDate() - createdAt.getDate();
  const timeDiff = now.getHours() - createdAt.getHours();

  return yearDiff > 0
    ? `${yearDiff}년`
    : monthDiff > 0
      ? `${monthDiff}달`
      : monthDiff > 0
        ? `${monthDiff}달`
        : dayDiff > 0
          ? `${dayDiff}일`
          : `${timeDiff}시간`;
}
