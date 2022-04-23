import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  // console.log(dayjs(new Date(year, month, 1)).day());
  // console.log(dayjs(new Date(year, 6, 0)).day());
  // console.log(dayjs(new Date(year, 6, -1)).day());
  // console.log(dayjs(new Date(year, month, currentMonthCount)).day());
  // make 7*5 array
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
}
