import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Math$trunc from 'babel-runtime/core-js/math/trunc';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { connect } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';
// import Visit from 'react-visit';
import { scrollLeftAction, scrollRightAction, scrollToAction, generateLeftAction, generateRightAction, selectIndexAction } from '../actions';
import { CALENDAR_TRESHOLD, VISIBLE_ITEMS_COUNT } from '../constants';
import NavBtn from './NavBtn';
import RenderItem from './RenderItem';
import { CalendarCss, SpecialFontCss } from '../styles';

var noop = function noop() {};

var CalendarScroll = function (_React$Component) {
  _inherits(CalendarScroll, _React$Component);

  function CalendarScroll(props) {
    _classCallCheck(this, CalendarScroll);

    var _this = _possibleConstructorReturn(this, (CalendarScroll.__proto__ || _Object$getPrototypeOf(CalendarScroll)).call(this, props));

    _this.scrollLeftOne = _this.scrollLeftOne.bind(_this);
    _this.scrollRightOne = _this.scrollRightOne.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    return _this;
  }

  _createClass(CalendarScroll, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var scrolledIndex = this.props.scrolledIndex;
      var length = this.props.children.length;
      if (scrolledIndex < VISIBLE_ITEMS_COUNT) {
        this.props.generateLeft(CALENDAR_TRESHOLD);
        this.props.scrollTo(CALENDAR_TRESHOLD + scrolledIndex);
      }
      if (scrolledIndex > length - VISIBLE_ITEMS_COUNT) {
        this.props.generateRight(CALENDAR_TRESHOLD);
      }
    }
  }, {
    key: 'scrollLeftOne',
    value: function scrollLeftOne() {
      return this.props.scrolledIndex > 0 && this.props.scrollLeft(1);
    }
  }, {
    key: 'scrollRightOne',
    value: function scrollRightOne() {
      return this.props.scrolledIndex < this.props.children.length - 1 && this.props.scrollRight(1);
    }
  }, {
    key: 'scrollTimer',
    value: function scrollTimer(scrolledPosition /* , event */) {
      var _props = this.props,
          _props$children = _props.children,
          children = _props$children === undefined ? [] : _props$children,
          _props$scrollTo = _props.scrollTo,
          scrollTo = _props$scrollTo === undefined ? noop : _props$scrollTo;

      var childWidth = this.props.width / VISIBLE_ITEMS_COUNT;
      var viewportCenter = this.props.width / 2;
      var centerIdx = _Math$trunc((scrolledPosition + viewportCenter) / childWidth);
      scrollTo(centerIdx);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(scrolledPosition, event) {
      var _this2 = this;

      // event.preventDefault();
      event.stopPropagation();
      if (this.scrollTimerID) {
        clearTimeout(this.scrollTimerID);
      }
      this.scrollTimerID = setTimeout(function () {
        return _this2.scrollTimer(scrolledPosition, event);
      }, 500);
    }
  }, {
    key: 'focusTimer',
    value: function focusTimer(index /* , event*/) {
      if (this.props.scrolledIndex !== index) {
        this.props.scrollTo(index);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(index, event) {
      var _this3 = this;

      // event.preventDefault();
      if (this.focusTimerID) {
        clearTimeout(this.focusTimerID);
      }
      this.focusTimerID = setTimeout(function () {
        return _this3.focusTimer(index, event);
      }, 200);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$Child = _props2.Child,
          Child = _props2$Child === undefined ? {} : _props2$Child,
          _props2$children = _props2.children,
          children = _props2$children === undefined ? [] : _props2$children,
          width = _props2.width,
          _props2$scrollLeft = _props2.scrollLeft,
          scrollLeft = _props2$scrollLeft === undefined ? noop : _props2$scrollLeft,
          _props2$scrollRight = _props2.scrollRight,
          scrollRight = _props2$scrollRight === undefined ? noop : _props2$scrollRight,
          _props2$scrollTo = _props2.scrollTo,
          scrollTo = _props2$scrollTo === undefined ? noop : _props2$scrollTo,
          _props2$overscanCount = _props2.overscanCount,
          overscanCount = _props2$overscanCount === undefined ? VISIBLE_ITEMS_COUNT * 2 : _props2$overscanCount,
          _props2$childWidth = _props2.childWidth,
          childWidth = _props2$childWidth === undefined ? width / VISIBLE_ITEMS_COUNT : _props2$childWidth,
          _props2$height = _props2.height,
          height = _props2$height === undefined ? 100 : _props2$height,
          _props2$scrolledIndex = _props2.scrolledIndex,
          scrolledIndex = _props2$scrolledIndex === undefined ? CALENDAR_TRESHOLD : _props2$scrolledIndex,
          selectedIndex = _props2.selectedIndex,
          selectIndex = _props2.selectIndex,
          otherProps = _objectWithoutProperties(_props2, ['Child', 'children', 'width', 'scrollLeft', 'scrollRight', 'scrollTo', 'overscanCount', 'childWidth', 'height', 'scrolledIndex', 'selectedIndex', 'selectIndex']);

      var childrenLength = children.length;
      var handleWheel = function handleWheel(event) {
        event.preventDefault();
        var delta = event.deltaY;
        if (delta < 0 && scrolledIndex > 0) {
          scrollLeft(1);
        }
        if (delta > 0 && scrolledIndex < childrenLength - 1) {
          scrollRight(1);
        }
      };

      var list = React.createElement(VirtualList, {
        width: width,
        height: height,
        itemCount: childrenLength,
        itemSize: childWidth // Also supports variable heights (array or function getter)
        , renderItem: RenderItem(_extends({
          children: children,
          Child: Child,
          handleFocus: this.handleFocus,
          selectedIndex: selectedIndex,
          selectIndex: selectIndex
        }, otherProps)),
        scrollDirection: 'horizontal',
        scrollToIndex: scrolledIndex,
        scrollToAlignment: 'center',
        overscanCount: overscanCount,
        onScroll: this.handleScroll,
        onWheel: handleWheel
      });
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: CalendarCss.month },
          React.createElement(
            'b',
            { className: SpecialFontCss.font1 },
            'calImg'
          ),
          ' ',
          '' + children[scrolledIndex].month
        ),
        React.createElement(
          'div',
          { className: CalendarCss.container },
          React.createElement(
            NavBtn,
            {
              className: CalendarCss.leftScrollBtn,
              onClick: this.scrollLeftOne,
              name: 'scrollLeft'
            },
            '<'
          ),
          list,
          React.createElement(
            NavBtn,
            {
              className: CalendarCss.rightScrollBtn,
              onClick: this.scrollRightOne,
              name: 'scrollRight'
            },
            '>'
          )
        )
      );
    }
  }]);

  return CalendarScroll;
}(React.Component);

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
    },
    generateRight: function generateRight(payload) {
      return dispatch(generateRightAction(payload));
    },
    generateLeft: function generateLeft(payload) {
      return dispatch(generateLeftAction(payload));
    },
    selectIndex: function selectIndex(payload) {
      return dispatch(selectIndexAction(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispathcToProps)(CalendarScroll);
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/components/CalendarScroll.js.map