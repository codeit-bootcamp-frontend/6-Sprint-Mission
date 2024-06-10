export const formatTimeAgo = (time: string | Date) => {
  const currentTime = new Date().getTime();
  const agoTime = Math.floor((currentTime - new Date(time).getTime()) / (1000 * 60 * 60));
  const agoDay = Math.floor(agoTime / 24);
  const agoYear = Math.floor(agoDay / 365);
  if (agoTime < 24) {
    return `${agoTime}시간 전`;
  } else if (agoTime >= 24) {
    return `${agoDay}일 전`;
  } else if (agoDay >= 365) {
    return `${agoYear}년 전`;
  }
};

export default formatTimeAgo;
