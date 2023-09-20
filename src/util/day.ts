import dayjs from 'dayjs';

export const openDay = (date:any) => {
  const today = dayjs();

  const isTodayBeforeOtherDate = today.isBefore(date);
}