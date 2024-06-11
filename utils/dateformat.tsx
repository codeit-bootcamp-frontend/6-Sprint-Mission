export function formatDate(date: Date): string {
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/(\.\s*)$/, ""); // 마지막 마침표 제거
}
