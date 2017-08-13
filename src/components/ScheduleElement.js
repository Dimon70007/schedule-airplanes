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
const ScheduleElement = ({
  // cost = 'cost RUB',
  // startTime = 'startTime',
  // endTime = 'endTime',
  // startPoint = 'startPoint',
  // endPoint = 'endPoint',
  // timeInPath = 'timeInPath',
  weather: [{ icon, description }],
  dt_txt: dtTxt,
  main: { temp_max: tempMax, temp_min: tempMin, pressure },
  wind: { speed },
  clouds: { all },
}) => (
// <div className={ScheduleCss.element}>
//   <p className={ScheduleCss.timeStartEnd}>
//   {startTime} <b className={AppCss.imgFont}> fa-long-arrow-right [&#xf178;]</b> {endTime}</p>
//   <p className={ScheduleCss.line}>{`${startPoint} - ${endPoint}`}</p>
//   <p className={ScheduleCss.line}>{`Время в пути: ${timeInPath}`}</p>
//   <p className={ScheduleCss.cost}>{'от '}<b>{cost}</b></p>
// </div>
  <div className={ScheduleCss.element}>
    <table className={ScheduleCss['weather-forecast-list__table']}>
      <tbody>
        <tr className={ScheduleCss['weather-forecast-list__items']}>
          <td className={ScheduleCss['weather-forecast-list__item']}>
            {moment(dtTxt).format('dddd, Do MMMM, HH:mm')}
            <img src={weatherImgUrl(icon)} alt={`${icon}.png`} />
          </td>
          <td className={ScheduleCss['weather-forecast-list__item']}>
            <span className={ScheduleCss['weather-forecast-list__day']}>
              {Math.round(tempMax)} °C
            </span>&nbsp;
            <span className={ScheduleCss['weather-forecast-list__night']}>
              {Math.round(tempMin)} °C
            </span>
            &nbsp;
            <i className={ScheduleCss['weather-forecast-list__naturalPhenomenon']}>{description}</i>
            <p>{`${speed} m/s`}&nbsp;<br />{`Влажность: ${all} %`},&nbsp;&nbsp;
              {`${pressure} hpa`}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

      );

export default ScheduleElement;
