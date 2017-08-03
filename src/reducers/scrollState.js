import { CALENDAR_TRESHOLD } from '../constants';
import { SCROLL_ACTIONS, SELECT_INDEX } from '../actions';

const init = {
  scrollToIndex: CALENDAR_TRESHOLD,
  selectedIndex: -1,
};
const [scrollLeft, scrollRight, dropDownScroll, scrollTo] = SCROLL_ACTIONS;

export default (state = init, action) => {
  switch (action.type) {
    case SELECT_INDEX:
      return {
        ...state,
        selectedIndex: action.payload,
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
