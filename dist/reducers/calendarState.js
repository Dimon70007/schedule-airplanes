import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import { GENERATOR_ACTIONS } from '../actions';
import { generateCalendar, genLeftPartCalendar, genRightPartCalendar } from '../helpers';
// import { CALENDAR_TRESHOLD } from '../constants';

var init = generateCalendar();

export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  if (!GENERATOR_ACTIONS.includes(action.type)) {
    return state;
  }

  var _GENERATOR_ACTIONS = _slicedToArray(GENERATOR_ACTIONS, 3),
      generateLeft = _GENERATOR_ACTIONS[0],
      generateRight = _GENERATOR_ACTIONS[1],
      dropdownGenerator = _GENERATOR_ACTIONS[2];

  switch (action.type) {
    case generateLeft:
      return [].concat(_toConsumableArray(genLeftPartCalendar(state[0].strDate, action.payload)), _toConsumableArray(state.slice(0, 1000)));
    case generateRight:
      return [].concat(_toConsumableArray(state.slice(-1000)), _toConsumableArray(genRightPartCalendar(state[state.length - 1].strDate, action.payload)));
    case dropdownGenerator:
      return init;
    default:
      return state;
  }
});
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/reducers/calendarState.js.map