export default function formatTimeAgo(dateString: Date): string {
  const currentDate: Date = new Date();
  const pastDate: Date = new Date(dateString);

  const passedMilliseconds: number = currentDate.getTime() - pastDate.getTime();
  const passedSeconds: number = Math.floor(passedMilliseconds / 1000);
  const passedMinutes: number = Math.floor(passedSeconds / 60);
  const passedHours: number = Math.floor(passedMinutes / 60);
  const passedDays: number = Math.floor(passedHours / 24);

  switch (true) {
    case passedSeconds < 60:
      return `${passedSeconds}초 전`;
    case passedMinutes < 60:
      return `${passedMinutes}분 전`;
    case passedHours < 24:
      return `${passedHours}시간 전`;
    default:
      return `${passedDays}일 전`;
  }
}
