import dayjs from 'dayjs';

export const openDay = (date:any) => {
  const today = dayjs();
  const isTodayBeforeOtherDate = today.isBefore(date);
}

export const day = (date:any) => {
  return dayjs(date).format('YY-MM-DD HH:mm');
}

export const weekDay = (week:number) => {
  const today = dayjs();
  return today.add(week * 7, "day");
}