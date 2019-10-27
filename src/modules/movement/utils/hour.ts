export function getHourString(hour: number): string {
  return `${hour.toString().length > 1 ? hour : '0' + hour}`;
}
