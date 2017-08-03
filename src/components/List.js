import React from 'react';
import { ScheduleCss } from '../styles';

const List = ({
  children = [],
  Child = {},
  emptyData,
  childProps = {},
  className = ScheduleCss.container,
  // firstVisible = 0,
  // lastVisible = Math.min(30, children.lenght),
 }) => {
  const list = children.map((obj, index) => (
    <li key={obj.dt}>
      <Child
        index={index}
        {...childProps}
        {...obj}
      />
    </li>
  ));
  const renderList = !emptyData ? (
    <ul className={className}>
      {list}
    </ul>
    )
   : (<div className={ScheduleCss.oops}>
     «<b>
       Ничего не найдено.
     </b> На указанную дату данные отсутствуют»
     <div className={ScheduleCss.oopsImg}>
       <img className={ScheduleCss.beast404le} src='https://developer.cdn.mozilla.net/static/img/beast-404_LE.f1435cace4b4.png' alt='' />
       <img className={ScheduleCss.beast404re} src='https://developer.cdn.mozilla.net/static/img/beast-404_RE.2e53f96c5abb.png' alt='' />
       <img
         className={ScheduleCss.beast}
         alt='На указанную дату данные отсутствуют'
         src='https://developer.cdn.mozilla.net/static/img/beast-404.ce38fcf80386.png'
       />
     </div>
   </div>);
  return (
    <div className={ScheduleCss.container}>
      {renderList}
    </div>
  );
};

export default List;
