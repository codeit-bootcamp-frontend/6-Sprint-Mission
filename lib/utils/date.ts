export default function getFormatDate(createdAt: string) {
  const date = new Date(createdAt).getDate();
  const month = new Date(createdAt).getMonth() + 1;
  const year = new Date(createdAt).getFullYear();
  const createdDate = `${year}. ${month}. ${date}`;
  return createdDate;
}
