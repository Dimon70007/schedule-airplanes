// import url from 'url';
import moment from 'moment';
import { mergeurlQuery } from './helpers';

const countPerDay = 24 / 3;
const TulaId = 480562;
export const getForecastQuery = (id = TulaId) => ({
  id,
  APPID: '0b54a198a8077b3988006e964f27dd19',
});
export const getForecastQuery1 = (id = TulaId) => ({
  id,
  APPID: '0b54a198a8077b3988006e964f27dd19',
  units: 'metric',
});
export const getHistoryQuery = ({
  start, stop, count = countPerDay, id = TulaId }) => ({
    id,
    APPID: '0b54a198a8077b3988006e964f27dd19',
    start,
    end: stop,
    type: 'hour',
    cnt: count,
  });
export const forecastUrl1 = 'https://openweathermap.org/data/2.5/forecast/daily';
export const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';
export const historyUrl = 'http://history.openweathermap.org/data/2.5/history/city';

export const weatherImgUrl = (icon = '01d') => `http://openweathermap.org/img/w/${icon}.png`;

export const fetchForecastWeather = () => ({ query = {} }) =>
  getWeather(forecastUrl, { ...getForecastQuery(), ...query });

export const fetchHistoryWeather = (
    startDate,
    stopDate = moment(startDate).add(1, 'days')) => {
  const start = moment(startDate).unix();
  const stop = moment(stopDate).unix();
  const count = Math.abs(moment(stopDate).diff(moment(startDate), 'days') * countPerDay);
  const historyQuery = getHistoryQuery({ start, stop, count });
  return ({ query = {} }) =>
    getWeather(historyUrl, { ...historyQuery, ...query });
};

export const getFetcher = (targetDate = moment()) => {
  const now = moment().format('YYYY-MM-DD');
  const received = moment(targetDate).format('YYYY-MM-DD');
  const stopDate = moment(received).add(1, 'days').format('YYYY-MM-DD');
  const diff = moment(received).diff(now, 'day');
  if (moment(received).isBefore(now, 'day')) {
    return fetchHistoryWeather(received, stopDate);
  }
  if (diff >= 0 && diff <= 5) {
    return fetchForecastWeather();
  }
  return () => Promise.reject('too big date');
};

const getWeather = (newPath = '', query = {}) => {
  const urlWithParams = mergeurlQuery(newPath, query);
  // console.log('urlWithParams ', urlWithParams);
  return fetch(urlWithParams);
};

const postPath = (newPath, data) => Promise.resolve('//todo postPath', data);

export { getWeather, postPath };
