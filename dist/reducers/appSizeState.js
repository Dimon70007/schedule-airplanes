import _extends from 'babel-runtime/helpers/extends';
import { SET_APP_SIZE_ACTION } from '../actions';

var init = {
  height: window.innerHeight,
  width: window.innerWidth
};

export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  if (action.type !== SET_APP_SIZE_ACTION) {
    return state;
  }
  return _extends({}, state, action.payload);
});
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/reducers/appSizeState.js.map