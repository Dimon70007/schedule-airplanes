import React from 'react';
import { connect } from 'react-redux';
import { scrollLeftAction, scrollRightAction, scrollToAction } from '../actions';
import List from './List';
import { CALENDAR_TRESHOLD } from '../constants';
import { CalendarCss, SpecialFontCss } from '../styles';

var noop = function noop() {};

var handleVisit = function handleVisit(index) {
  return function () {
    console.log('u visited index ', index);
  };
};

var handleLeave = function handleLeave(index) {
  return function () {
    console.log('u left index ', index);
  };
};

var CalendarScroll = function CalendarScroll(_ref) {
  var _ref$Child = _ref.Child,
      Child = _ref$Child === undefined ? {} : _ref$Child,
      _ref$children = _ref.children,
      children = _ref$children === undefined ? [] : _ref$children,
      _ref$scrollLeft = _ref.scrollLeft,
      scrollLeft = _ref$scrollLeft === undefined ? noop : _ref$scrollLeft,
      _ref$scrollRight = _ref.scrollRight,
      scrollRight = _ref$scrollRight === undefined ? noop : _ref$scrollRight,
      _ref$scrollTo = _ref.scrollTo,
      scrollTo = _ref$scrollTo === undefined ? noop : _ref$scrollTo,
      _ref$handleClick = _ref.handleClick,
      handleClick = _ref$handleClick === undefined ? noop : _ref$handleClick,
      _ref$overscanCount = _ref.overscanCount,
      overscanCount = _ref$overscanCount === undefined ? CALENDAR_TRESHOLD : _ref$overscanCount,
      _ref$ChildSize = _ref.ChildSize,
      ChildSize = _ref$ChildSize === undefined ? 120 : _ref$ChildSize,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? ChildSize * 5 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 200 : _ref$height,
      _ref$scrolledIndex = _ref.scrolledIndex,
      scrolledIndex = _ref$scrolledIndex === undefined ? CALENDAR_TRESHOLD + 1 : _ref$scrolledIndex,
      selectedIndex = _ref.selectedIndex;

  var childrenLength = children.length;

  var handleFocus = function handleFocus(index) {
    return function () {
      scrollTo(index);
      console.log('index ', index);
    };
  };

  var handleWheel = function handleWheel(event) {
    // event.preventDefault();
    var delta = event.deltaY;
    if (delta < 0 && scrolledIndex > 0) {
      scrollLeft(1);
    }
    if (delta > 0 && scrolledIndex < childrenLength - 1) {
      scrollRight(1);
    }
  };

  var handleScroll = function handleScroll(scrolledPosition, event) {
    // event.preventDefault();
    var itemIndex = scrolledPosition / ChildSize;
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
  var childProps = {
    onFocus: handleFocus,
    onClick: handleClick,
    selectedIndex: selectedIndex
  };
  return React.createElement(
    'div',
    { className: CalendarCss.container },
    React.createElement(
      'p',
      { className: CalendarCss.month },
      React.createElement('b', { className: SpecialFontCss.font1 }),
      ' ',
      '' + children[scrolledIndex].month
    ),
    React.createElement(
      'div',
      { className: CalendarCss['horizontal-parent'] },
      React.createElement(
        'div',
        { className: CalendarCss['horizontal-child'] },
        React.createElement(
          List,
          {
            Child: Child,
            childProps: childProps,
            className: CalendarCss.slide
          },
          children
        )
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    calendarItems: state.calendarState || [],
    scrolledIndex: state.scrollState && state.scrollState.scrollToIndex,
    selectedIndex: state.scrollState && state.scrollState.selectedIndex
  };
};
var mapDispathcToProps = function mapDispathcToProps(dispatch) {
  return {
    scrollLeft: function scrollLeft(payload) {
      return dispatch(scrollLeftAction(payload));
    },
    scrollRight: function scrollRight(payload) {
      return dispatch(scrollRightAction(payload));
    },
    scrollTo: function scrollTo(payload) {
      return dispatch(scrollToAction(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispathcToProps)(CalendarScroll);
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/components/CalendarScroll_v2.js.map