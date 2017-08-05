import { CALENDAR_LENGTH, APP_WIDTH } from '../constants';
import { SCROLL_ACTIONS, SELECT_INDEX } from '../actions';
import { idxToPosition } from '../helpers';

const scrollToIndex = Math.trunc(CALENDAR_LENGTH / 2);

const init = {
  scrollToIndex,
  selectedIndex: -1,
  scrolledPosition: idxToPosition(scrollToIndex, APP_WIDTH),
};
const [scrollLeft, scrollRight, dropDownScroll, scrollTo, scrollToPosition] = SCROLL_ACTIONS;

export default (state = init, action) => {
  switch (action.type) {
    case SELECT_INDEX:
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case scrollToPosition:
      return {
        ...state,
        scrolledPosition: action.payload,
      };
    case scrollTo:
      return {
        ...state,
        scrollToIndex: action.payload,
      };
    case scrollLeft:
      return {
        ...state,
        scrollToIndex: state.scrollToIndex - action.payload,
      };
    case scrollRight:
      return {
        ...state,
        scrollToIndex: state.scrollToIndex + action.payload,
      };
    case dropDownScroll:
      return init;
    default:
      return state;
  }
};
