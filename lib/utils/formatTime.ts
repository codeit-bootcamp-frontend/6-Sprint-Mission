export default function getFormatTime(dateString: string): string {
  const now: Date = new Date();
  const updatedAt: Date = new Date(dateString);
  const diffInSeconds: number = Math.floor((now.getTime() - updatedAt.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분전`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간전`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}일전`;
  }
}
