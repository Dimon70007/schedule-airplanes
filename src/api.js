// import url from 'url';
import moment from 'moment';
import { mergeurlQuery } from './helpers';

const countPerDay = 24 / 3;
const TulaId = 480562;
export const getForecastQuery = (id = TulaId) => ({
  id,
  APPID: '0b54a198a8077b3988006e964f27dd19',
  units: 'metric',
  lang: 'ru',
});
export const getForecastQuery1 = (id = TulaId) => ({
  id,
  APPID: '0b54a198a8077b3988006e964f27dd19',
  units: 'metric',
  lang: 'ru',
});
export const getHistoryQuery = ({
  start, stop, count = countPerDay, id = TulaId }) => ({
    id,
    APPID: '0b54a198a8077b3988006e964f27dd19',
    start,
    end: stop,
    type: 'hour',
    cnt: count,
    units: 'metric',
    lang: 'ru',
  });
export const prefix = 'https://cors-anywhere.herokuapp.com/';
export const forecastUrl1 = 'https://api.openweathermap.org/data/2.5/forecast/daily';
export const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';
export const historyUrl = 'http://history.openweathermap.org/data/2.5/history/city';

export const weatherImgUrl = (icon = '01d') => {
  // window.location.replace('http://api.openweathermap.org');
  switch (icon) {
    case '01n' :
      return 'https://s19.postimg.org/uq0m99ldf/01n.png';
    case '02d' :
      return 'https://s19.postimg.org/5ipq90i9f/02d.png';
    case '02n' :
      return 'https://s19.postimg.org/pfvnhz14j/02n.png';
    case '03d' :
      return 'https://s19.postimg.org/xzf1fq9gz/03d.png';
    case '03n' :
      return 'https://s19.postimg.org/5p80pugs3/03n.png';
    case '04d' :
      return 'https://s19.postimg.org/t21gum7hv/04d.png';
    case '04n' :
      return 'https://s19.postimg.org/jk6b8bb77/04n.png';
    case '09d' :
      return 'https://s19.postimg.org/owv5mfz3n/09d.png';
    case '09n' :
      return 'https://s19.postimg.org/6ikmigmsz/09n.png';
    case '10d' :
      return 'https://s19.postimg.org/mjd7vfkoj/10d.png';
    case '10n' :
      return 'https://s19.postimg.org/42it4m4qb/10n.png';
    case '11d' :
      return 'https://s19.postimg.org/albnhjgxf/11d.png';
    case '11n' :
      return 'https://s19.postimg.org/szm6lit83/11n.png';
    case '13d' :
      return 'https://s19.postimg.org/azczh510z/13d.png';
    case '13n' :
      return 'https://s19.postimg.org/5cl7xenw3/13n.png';
    case '50d' :
      return 'https://s19.postimg.org/i59bxbzhv/50d.png';
    case '50n' :
      return 'https://s19.postimg.org/h989450fn/50n.png';
    default:
      return 'https://s19.postimg.org/omj1pcv3n/01d.png';
  }
};

export const fetchForecastWeather = () => ({ query = {} }) =>
  // window.location.replace('http://api.openweathermap.org');
   getWeather(forecastUrl, { ...getForecastQuery(), ...query });

export const fetchHistoryWeather = (
    startDate,
    stopDate = moment(startDate).add(1, 'days')) => {
  const start = moment(startDate).unix();
  const stop = moment(stopDate).unix();
  const count = Math.abs(moment(stopDate).diff(moment(startDate), 'days') * countPerDay);
  const historyQuery = getHistoryQuery({ start, stop, count });
  return ({ query = {} }) =>
    // window.location.replace('http://history.openweathermap.org');
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
  const urlWithParams = mergeurlQuery(`${prefix}${newPath}`, query);
  // console.log('urlWithParams ', urlWithParams);
  return fetch(urlWithParams);
};

const postPath = (newPath, data) => Promise.resolve('//todo postPath', data);

export { getWeather, postPath };
