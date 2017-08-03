import moment from 'moment';
import { CALENDAR_TRESHOLD } from '../constants';

moment.locale('ru');
export const datePack = (date) => {
  const [dayOfWeek, month] = moment(date).format('dd MMMM').split(' ');
  return ({
    id: moment(date).unix(),
    ...moment(date).toObject(),
    dayOfWeek,
    month,
    strDate: moment(date).format('YYYY-MM-DD'),
    cost: '' });
};

export const isDatesEquals = (first, second) => {
  const firstDate = moment(first).format('YYYY-MM-DD');
  const secondDate = moment(second).format('YYYY-MM-DD');
  const diff = moment(firstDate).diff(secondDate, 'days');
  return diff === 0;
};

export const getDates = (startDate, stopDate) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  const stopDat = moment(stopDate);
  while (currentDate <= stopDat) {
    dateArray.push(datePack(currentDate));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};

export const generateCalendar = (currentDate = moment(), count = CALENDAR_TRESHOLD * 2) => [
  ...genLeftPartCalendar(currentDate, count / 2),
  datePack(moment(currentDate)),
  ...genRightPartCalendar(currentDate, count / 2)];

export const genLeftPartCalendar = (curDate = moment(), count = CALENDAR_TRESHOLD) => {
  const startDate = moment(curDate).subtract(count, 'days');
  const stopDate = moment(curDate).subtract(1, 'days');
  return getDates(startDate, stopDate);
};

export const subtractDaysFromDate = (date, count) =>
  datePack(moment(date).subtract(count, 'days'));

export const genRightPartCalendar = (curDate = moment(), count = CALENDAR_TRESHOLD) => {
  const startDate = moment(curDate).add(1, 'days');
  const stopDate = moment(curDate).add(count, 'days');
  return getDates(startDate, stopDate);
};
