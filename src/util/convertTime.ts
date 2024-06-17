export const convertTime = (textDate: string) => {
  const date = new Date(textDate);
  const year = date.getFullYear();
  const day = date.getDay();
  const month = attachZero(date);
  return `${year}. ${month}. ${day} `;
};

const attachZero = (date: Date) => {
  let month: number | string = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month.toString();
  }
  return month;
};

