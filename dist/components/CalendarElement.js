import React from 'react';
import { CalendarCss } from '../styles';
import NavBtn from './NavBtn';

var CalendarElement = function CalendarElement(props) {
  var date = props.date,
      getCost = props.getCost,
      selected = props.selected,
      onFocus = props.onFocus,
      onClick = props.onClick;


  var dateClass = selected ? CalendarCss.line + ' ' + CalendarCss.selected : CalendarCss.line;
  return React.createElement(
    NavBtn,
    {
      className: CalendarCss.element,
      onClick: onClick,
      onFocus: onFocus
    },
    React.createElement(
      'p',
      { className: CalendarCss.line },
      props.dayOfWeek
    ),
    React.createElement(
      'p',
      { className: dateClass },
      date
    ),
    React.createElement(
      'p',
      { className: CalendarCss.line },
      getCost(date),
      ' \xB0C'
    )
  );
};

export default CalendarElement;
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/components/CalendarElement.js.map