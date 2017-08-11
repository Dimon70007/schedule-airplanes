import React from 'react';
import { CalendarCss } from '../styles';
import NavBtn from './NavBtn';

const CalendarElement = (props) => {
  const {
    date,
    getCost,
    selected,
    onFocus,
  onClick } = props;

  const dateClass = selected ?
    `${CalendarCss.line} ${CalendarCss.selected}` :
    CalendarCss.line;
  return (
    <NavBtn
      className={CalendarCss.element}
      onClick={onClick}
      onFocus={onFocus}
    >
      <p className={CalendarCss.line}>{props.dayOfWeek}</p>
      <p className={dateClass}>{date}</p>
      <p className={CalendarCss.line}>{getCost(date)} °C</p>
    </NavBtn>
  );
};

export default CalendarElement;
