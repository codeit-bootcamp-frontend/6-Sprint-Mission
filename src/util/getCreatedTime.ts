export const getCreatedTime = (date: string) => {
  const now = new Date();
  const before = new Date(date);
  const time = now.getTime() - before.getTime();
  const timeDifferenceInSeconds = Math.floor(time / 1000);
  // 초를 시, 분, 초로 변환
  const day = Math.floor(timeDifferenceInSeconds / 86400);
  const hours = Math.floor((timeDifferenceInSeconds % 86400) / 3600);
  return { day: day, hours: hours };
};

