import _Promise from 'babel-runtime/core-js/promise';
import _extends from 'babel-runtime/helpers/extends';
// import url from 'url';
import moment from 'moment';
import { mergeurlQuery } from './helpers';

var countPerDay = 24 / 3;
var TulaId = 480562;
export var getForecastQuery = function getForecastQuery() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TulaId;
  return {
    id: id,
    APPID: '0b54a198a8077b3988006e964f27dd19',
    units: 'metric',
    lang: 'ru'
  };
};
export var getForecastQuery1 = function getForecastQuery1() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TulaId;
  return {
    id: id,
    APPID: '0b54a198a8077b3988006e964f27dd19',
    units: 'metric',
    lang: 'ru'
  };
};
export var getHistoryQuery = function getHistoryQuery(_ref) {
  var start = _ref.start,
      stop = _ref.stop,
      _ref$count = _ref.count,
      count = _ref$count === undefined ? countPerDay : _ref$count,
      _ref$id = _ref.id,
      id = _ref$id === undefined ? TulaId : _ref$id;
  return {
    id: id,
    APPID: '0b54a198a8077b3988006e964f27dd19',
    start: start,
    end: stop,
    type: 'hour',
    cnt: count,
    units: 'metric',
    lang: 'ru'
  };
};
export var prefix = 'https://cors-anywhere.herokuapp.com/';
export var forecastUrl1 = 'https://api.openweathermap.org/data/2.5/forecast/daily';
export var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';
export var historyUrl = 'http://history.openweathermap.org/data/2.5/history/city';

export var weatherImgUrl = function weatherImgUrl() {
  var icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '01d';
  return (
    // window.location.replace('http://api.openweathermap.org');
    'https://www.dropbox.com/sh/40ozkeytc5tasmh/AABryDjhtwm3JVWwI8QZdaHVa?dl=1/' + icon + '.png'
  );
};

export var fetchForecastWeather = function fetchForecastWeather() {
  return function (_ref2) {
    var _ref2$query = _ref2.query,
        query = _ref2$query === undefined ? {} : _ref2$query;
    return (
      // window.location.replace('http://api.openweathermap.org');
      getWeather(forecastUrl, _extends({}, getForecastQuery(), query))
    );
  };
};

export var fetchHistoryWeather = function fetchHistoryWeather(startDate) {
  var stopDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : moment(startDate).add(1, 'days');

  var start = moment(startDate).unix();
  var stop = moment(stopDate).unix();
  var count = Math.abs(moment(stopDate).diff(moment(startDate), 'days') * countPerDay);
  var historyQuery = getHistoryQuery({ start: start, stop: stop, count: count });
  return function (_ref3) {
    var _ref3$query = _ref3.query,
        query = _ref3$query === undefined ? {} : _ref3$query;
    return (
      // window.location.replace('http://history.openweathermap.org');
      getWeather(historyUrl, _extends({}, historyQuery, query))
    );
  };
};

export var getFetcher = function getFetcher() {
  var targetDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : moment();

  var now = moment().format('YYYY-MM-DD');
  var received = moment(targetDate).format('YYYY-MM-DD');
  var stopDate = moment(received).add(1, 'days').format('YYYY-MM-DD');
  var diff = moment(received).diff(now, 'day');
  if (moment(received).isBefore(now, 'day')) {
    return fetchHistoryWeather(received, stopDate);
  }
  if (diff >= 0 && diff <= 5) {
    return fetchForecastWeather();
  }
  return function () {
    return _Promise.reject('too big date');
  };
};

var getWeather = function getWeather() {
  var newPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var urlWithParams = mergeurlQuery('' + prefix + newPath, query);
  // console.log('urlWithParams ', urlWithParams);
  return fetch(urlWithParams);
};

var postPath = function postPath(newPath, data) {
  return _Promise.resolve('//todo postPath', data);
};

export { getWeather, postPath };
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/api.js.map