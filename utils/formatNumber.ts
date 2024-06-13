export function formatNumberWithCommas(number: number): string {
  return new Intl.NumberFormat().format(number);
}
