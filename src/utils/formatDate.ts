export default function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString)
  return date
    .toLocaleDateString('ko', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.')
}
