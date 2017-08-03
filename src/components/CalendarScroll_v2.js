import React from 'react';
import { connect } from 'react-redux';
import { scrollLeftAction, scrollRightAction, scrollToAction } from '../actions';
import List from './List';
import { CALENDAR_TRESHOLD } from '../constants';
import { CalendarCss, SpecialFontCss } from '../styles';

const noop = () => {};

const handleVisit = index => () => {
  console.log('u visited index ', index);
};

const handleLeave = index => () => {
  console.log('u left index ', index);
};


const CalendarScroll = ({
  Child = {}, // required props
  children = [], // required props
  scrollLeft = noop, // ownProps
  scrollRight = noop, // ownProps
  scrollTo = noop, // ownProps
  handleClick = noop, // ownProps
  overscanCount = CALENDAR_TRESHOLD, // ownProps
  ChildSize = 120, // ownProps
  width = ChildSize * 5, // ownProps
  height = 200, // ownProps
  scrolledIndex = CALENDAR_TRESHOLD + 1, // ownProps
  selectedIndex, // ownProps
}) => {
  const childrenLength = children.length;

  const handleFocus = index => () => {
    scrollTo(index);
    console.log('index ', index);
  };

  const handleWheel = (event) => {
    // event.preventDefault();
    const delta = event.deltaY;
    if (delta < 0 && scrolledIndex > 0) {
      scrollLeft(1);
    }
    if (delta > 0 && scrolledIndex < childrenLength - 1) {
      scrollRight(1);
    }
  };

  const handleScroll = (scrolledPosition, event) => {
    // event.preventDefault();
    const itemIndex = scrolledPosition / ChildSize;
    console.log('itemIndex ', itemIndex);
    console.log('scrolledPosition ', scrolledPosition);
  };

//   function rowRenderer({
//   key,         // Unique key within array of rows
//   index,       // Index of row within collection
//   isScrolling, // The List is currently being scrolled
//   isVisible,   // This row is visible within the List (eg it is not an overscanned row)
//   style,        // Style object to be applied to row (to position it)
// }) {
//     /* The style property contains the item's absolute position */
//     const itemProps = children[index] || {};
//     // if (index < overscanCount && isVisible) {
//     //   console.log('handling left load');
//     // }
//     // if (childrenLength - index > overscanCount && isVisible) {
//     //   console.log('handling right load');
//     // }
//
//     return (
//       <div
//         key={key}
//         style={style}
//         onFocus={handleFocus(index)}
//         onClick={handleClick(index)}
//         role='button'
//         tabIndex={index}
//       >
//         <Child
//           key={itemProps.id}
//           // selected={index === selectedIndex}
//           index={index}
//           {...itemProps}
//         />
//       </div>);
//   }
  const childProps = {
    onFocus: handleFocus,
    onClick: handleClick,
    selectedIndex,
  };
  return (
    <div className={CalendarCss.container}>
      <p className={CalendarCss.month}>
        <b className={SpecialFontCss.font1}>
        calImg</b> {`${children[scrolledIndex].month}`}
      </p>
      <div className={CalendarCss['horizontal-parent']}>
        <div className={CalendarCss['horizontal-child']}>
          <List
            Child={Child}
            childProps={childProps}
            className={CalendarCss.slide}
          >
            {children}
          </List>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  calendarItems: state.calendarState || [],
  scrolledIndex: state.scrollState && state.scrollState.scrollToIndex,
  selectedIndex: state.scrollState && state.scrollState.selectedIndex,
});
const mapDispathcToProps = dispatch => ({
  scrollLeft: payload => dispatch(scrollLeftAction(payload)),
  scrollRight: payload => dispatch(scrollRightAction(payload)),
  scrollTo: payload => dispatch(scrollToAction(payload)),
});

export default connect(mapStateToProps, mapDispathcToProps)(CalendarScroll);
