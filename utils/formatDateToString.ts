export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return `${year}. ${month}. ${day}`;
}

export function formatDateToTimeAgo(date: Date): string {
  const currentTime = new Date();
  const timeDifference = Math.floor(
    (currentTime.getTime() - date.getTime()) / 1000
  );

  const times = [
    { name: '년', seconds: 60 * 60 * 24 * 365 },
    { name: '개월', seconds: 60 * 60 * 24 * 30 },
    { name: '일', seconds: 60 * 60 * 24 },
    { name: '시간', seconds: 60 * 60 },
    { name: '분', seconds: 60 },
    { name: '초', seconds: 1 },
  ];

  for (const time of times) {
    const amount = Math.floor(timeDifference / time.seconds);
    if (amount >= 1) {
      return `${amount}${time.name} 전`;
    }
  }

  return '방금 전';
}
