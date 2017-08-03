import _extends from 'babel-runtime/helpers/extends';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import { CALENDAR_TRESHOLD } from '../constants';
import { SCROLL_ACTIONS, SELECT_INDEX } from '../actions';

var init = {
  scrollToIndex: CALENDAR_TRESHOLD,
  selectedIndex: -1
};

var _SCROLL_ACTIONS = _slicedToArray(SCROLL_ACTIONS, 4),
    scrollLeft = _SCROLL_ACTIONS[0],
    scrollRight = _SCROLL_ACTIONS[1],
    dropDownScroll = _SCROLL_ACTIONS[2],
    scrollTo = _SCROLL_ACTIONS[3];

export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  switch (action.type) {
    case SELECT_INDEX:
      return _extends({}, state, {
        selectedIndex: action.payload
      });
    case scrollTo:
      return _extends({}, state, {
        scrollToIndex: action.payload
      });
    case scrollLeft:
      return _extends({}, state, {
        scrollToIndex: state.scrollToIndex - action.payload
      });
    case scrollRight:
      return _extends({}, state, {
        scrollToIndex: state.scrollToIndex + action.payload
      });
    case dropDownScroll:
      return init;
    default:
      return state;
  }
});
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/reducers/scrollState.js.map