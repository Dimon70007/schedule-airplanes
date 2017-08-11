import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { connect } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';
import { scrollToAction, scrollToPositionAction, generateLeftAction, generateRightAction, selectIndexAction } from '../actions';
import { CALENDAR_TRESHOLD, CALENDAR_ITEM_WIDTH, CALENDAR_ITEM_HEIGHT } from '../constants';
import RenderItem from './RenderItem';
import { idxToPosition, positionToIdx } from '../helpers';
import { CalendarCss, SpecialFontCss } from '../styles';

var noop = function noop() {};

var CalendarScroll = function (_React$Component) {
  _inherits(CalendarScroll, _React$Component);

  function CalendarScroll(props) {
    _classCallCheck(this, CalendarScroll);

    var _this = _possibleConstructorReturn(this, (CalendarScroll.__proto__ || _Object$getPrototypeOf(CalendarScroll)).call(this, props));

    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    return _this;
  }

  _createClass(CalendarScroll, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var scrolledIndex = this.props.scrolledIndex;
      var nextPosition = nextProps.scrolledPosition,
          scrollToPosition = nextProps.scrollToPosition,
          nextWidth = nextProps.width,
          nextIndex = nextProps.scrolledIndex,
          scrollTo = nextProps.scrollTo,
          generateLeft = nextProps.generateLeft,
          generateRight = nextProps.generateRight,
          nextLength = nextProps.children.length;

      if (scrolledIndex !== nextIndex) {
        if (nextIndex < CALENDAR_TRESHOLD) {
          var calculatedPosition = CALENDAR_TRESHOLD * CALENDAR_ITEM_WIDTH;
          var newPosition = calculatedPosition + nextPosition;
          generateLeft(CALENDAR_TRESHOLD);
          var currentIdx = positionToIdx(newPosition, nextWidth);
          scrollToPosition(newPosition);
          scrollTo(currentIdx);
        }
        if (nextIndex > nextLength - CALENDAR_TRESHOLD) {
          generateRight(CALENDAR_TRESHOLD);
        }
      }
    }
  }, {
    key: 'scrollTimer',
    value: function scrollTimer(scrollOffset /* , event */) {
      var _props = this.props,
          appWidth = _props.width,
          scrolledIndex = _props.scrolledIndex,
          scrolledPosition = _props.scrolledPosition,
          scrollToPosition = _props.scrollToPosition,
          _props$scrollTo = _props.scrollTo,
          scrollTo = _props$scrollTo === undefined ? noop : _props$scrollTo;

      var centerIdx = positionToIdx(scrollOffset, appWidth);
      if (scrolledIndex !== centerIdx || scrolledPosition !== scrollOffset) {
        scrollToPosition(scrollOffset);
        scrollTo(centerIdx);
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(scrolledPosition, event) {
      var _this2 = this;

      if (this.scrollTimerID) {
        clearTimeout(this.scrollTimerID);
      }
      this.scrollTimerID = setTimeout(function () {
        return _this2.scrollTimer(scrolledPosition, event);
      }, 200);
    }
  }, {
    key: 'focusTimer',
    value: function focusTimer(index) {
      if (this.props.scrolledIndex !== index) {
        this.props.scrollTo(index);
        var newPosition = idxToPosition(index, this.props.width);
        this.props.scrollToPosition(newPosition);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(index, event) {
      var _this3 = this;

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
          Child = _props2.Child,
          children = _props2.children,
          width = _props2.width,
          scrollTo = _props2.scrollTo,
          overscanCount = _props2.overscanCount,
          childWidth = _props2.childWidth,
          height = _props2.height,
          scrolledPosition = _props2.scrolledPosition,
          scrolledIndex = _props2.scrolledIndex,
          selectedIndex = _props2.selectedIndex,
          selectIndex = _props2.selectIndex,
          otherProps = _objectWithoutProperties(_props2, ['Child', 'children', 'width', 'scrollTo', 'overscanCount', 'childWidth', 'height', 'scrolledPosition', 'scrolledIndex', 'selectedIndex', 'selectIndex']);

      var childrenLength = children.length;
      // const handleWheel = (event) => {
      //   event.preventDefault();
      //   const delta = event.deltaY;
      //   if (delta < 0 && scrolledIndex > 0) {
      //     scrollLeft(1);
      //   }
      //   if (delta > 0 && scrolledIndex < childrenLength - 1) {
      //     scrollRight(1);
      //   }
      // };

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
        scrollOffset: scrolledPosition,
        overscanCount: overscanCount,
        onScroll: this.handleScroll
        // onWheel={handleWheel}
      });
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: CalendarCss.monthContainer },
          React.createElement(
            'p',
            { className: CalendarCss.month },
            React.createElement(
              'span',
              { className: SpecialFontCss.iconFont },
              '\uF133'
            ),
            '   ' + children[scrolledIndex].month
          )
        ),
        React.createElement(
          'div',
          { className: CalendarCss.container },
          list
        ),
        React.createElement('div', { className: CalendarCss.margin })
      );
    }
  }]);

  return CalendarScroll;
}(React.Component);

CalendarScroll.defaultProps = {
  Child: {}, // required props
  children: [], // required props
  width: window.innerWidth, // required props
  overscanCount: CALENDAR_TRESHOLD * 2, // ownProps
  childWidth: CALENDAR_ITEM_WIDTH, // ownProps
  height: CALENDAR_ITEM_HEIGHT, // ownProps
  scrolledPosition: 0, // ownProps
  scrolledIndex: 0, // ownProps
  selectedIndex: -1, // ownProps
  scrollTo: noop, // ownProps
  generateLeft: noop, // ownProps
  generateRight: noop, // ownProps
  selectIndex: noop // ownProps
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    scrolledIndex: state.scrollState && state.scrollState.scrollToIndex,
    scrolledPosition: state.scrollState && state.scrollState.scrolledPosition,
    selectedIndex: state.scrollState && state.scrollState.selectedIndex
  };
};
var mapDispathcToProps = function mapDispathcToProps(dispatch) {
  return {
    scrollTo: function scrollTo(payload) {
      return dispatch(scrollToAction(payload));
    },
    scrollToPosition: function scrollToPosition(payload) {
      return dispatch(scrollToPositionAction(payload));
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