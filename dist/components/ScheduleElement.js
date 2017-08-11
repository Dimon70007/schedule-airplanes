import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import React from 'react';
import moment from 'moment';
import { ScheduleCss } from '../styles';
import { weatherImgUrl } from '../api';

// {
// "dt":1487246400,
// "dt_txt":"2017-02-16 12:00:00"
// "main":{
//  "temp":286.67,
//  "temp_min: tempMin":281.556,
//  "temp_max":286.67,
//  "pressure":972.73,
//  "sea_level":1046.46,
//  "grnd_level":972.73,
//  "humidity":75,
//  "temp_kf":5.11},
//  "weather":[
//      {
//        "id":800,
//        "main":"Clear",
//        "description":"clear sky",
//        "icon":"01d"
//      }
//    ],
//    "clouds":{"all":0},
//    "wind":{"speed":1.81,"deg":247.501},
//    "sys":{"pod":"d"},
// }


moment.locale('ru');
var ScheduleElement = function ScheduleElement(_ref) {
  var _ref$weather = _slicedToArray(_ref.weather, 1),
      _ref$weather$ = _ref$weather[0],
      icon = _ref$weather$.icon,
      description = _ref$weather$.description,
      dtTxt = _ref.dt_txt,
      _ref$main = _ref.main,
      tempMax = _ref$main.temp_max,
      tempMin = _ref$main.temp_min,
      pressure = _ref$main.pressure,
      speed = _ref.wind.speed,
      all = _ref.clouds.all;

  return (
    // <div className={ScheduleCss.element}>
    //   <p className={ScheduleCss.timeStartEnd}>
    //   {startTime} <b className={AppCss.imgFont}> fa-long-arrow-right [&#xf178;]</b> {endTime}</p>
    //   <p className={ScheduleCss.line}>{`${startPoint} - ${endPoint}`}</p>
    //   <p className={ScheduleCss.line}>{`Время в пути: ${timeInPath}`}</p>
    //   <p className={ScheduleCss.cost}>{'от '}<b>{cost}</b></p>
    // </div>
    React.createElement(
      'div',
      { className: ScheduleCss.element },
      React.createElement(
        'table',
        { className: ScheduleCss['weather-forecast-list__table'] },
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            { className: ScheduleCss['weather-forecast-list__items'] },
            React.createElement(
              'td',
              { className: ScheduleCss['weather-forecast-list__item'] },
              moment(dtTxt).format('dddd, Do MMMM, HH:mm'),
              React.createElement('img', { src: weatherImgUrl(icon), alt: 'forecast' })
            ),
            React.createElement(
              'td',
              { className: ScheduleCss['weather-forecast-list__item'] },
              React.createElement(
                'span',
                { className: ScheduleCss['weather-forecast-list__day'] },
                Math.round(tempMax),
                ' \xB0C'
              ),
              '\xA0',
              React.createElement(
                'span',
                { className: ScheduleCss['weather-forecast-list__night'] },
                Math.round(tempMin),
                ' \xB0C'
              ),
              '\xA0',
              React.createElement(
                'i',
                { className: ScheduleCss['weather-forecast-list__naturalPhenomenon'] },
                description
              ),
              React.createElement(
                'p',
                null,
                speed + ' m/s',
                '\xA0',
                React.createElement('br', null),
                '\u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C: ' + all + ' %',
                ',\xA0\xA0',
                pressure + ' hpa'
              )
            )
          )
        )
      )
    )
  );
};

export default ScheduleElement;
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/components/ScheduleElement.js.map