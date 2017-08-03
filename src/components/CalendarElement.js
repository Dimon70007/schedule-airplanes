import React from 'react';
import { CalendarCss } from '../styles';
import NavBtn from './NavBtn';
import { isDatesEquals } from '../helpers';

const CalendarElement = (props) => {
  const {
    date,
    getCost,
    selected,
    // index,
  onClick } = props;

  const dateClass = selected ?
    `${CalendarCss.line} ${CalendarCss.selected}` :
    CalendarCss.line;
  return (
    <NavBtn
      className={CalendarCss.element}
      onClick={onClick}
      // role='button'
      // tabIndex={-1}
    >
      <p className={CalendarCss.line}>{props.dayOfWeek}</p>
      <span className={dateClass}>{date}</span>
      <p className={CalendarCss.line}>{getCost(date)} °C</p>
    </NavBtn>
  );
};

export default CalendarElement;
