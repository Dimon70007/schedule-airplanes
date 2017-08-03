import { GENERATOR_ACTIONS } from '../actions';
import { generateCalendar, genLeftPartCalendar, genRightPartCalendar } from '../helpers';
// import { CALENDAR_TRESHOLD } from '../constants';

const init = generateCalendar();

export default (state = init, action) => {
  if (!GENERATOR_ACTIONS.includes(action.type)) {
    return state;
  }
  const [generateLeft, generateRight, dropdownGenerator] = GENERATOR_ACTIONS;
  switch (action.type) {
    case generateLeft:
      return [
        ...genLeftPartCalendar(state[0].strDate, action.payload),
        ...state.slice(0, 1000), // .slice(0, (state.length / 2) + 1)
      ];
    case generateRight:
      return [
        ...state.slice(-1000), // .slice((state.length / 2) + 1),
        ...genRightPartCalendar(state[state.length - 1].strDate, action.payload)];
    case dropdownGenerator:
      return init;
    default:
      return state;
  }
};
