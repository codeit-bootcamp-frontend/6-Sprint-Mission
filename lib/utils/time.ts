export default function getFormatTime(dateString: string): string {
  const now: Date = new Date();
  const updatedAt: Date = new Date(dateString);
  const diffInSeconds: number = Math.floor((now.getTime() - updatedAt.getTime()) / 1_000);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 60 * 60) {
    return `${Math.floor(diffInSeconds / 60)}분전`;
  } else if (diffInSeconds < 60 * 60 * 24) {
    return `${Math.floor(diffInSeconds / (60 * 60))}시간전`;
  } else {
    return `${Math.floor(diffInSeconds / (60 * 60 * 24))}일전`;
  }
}
