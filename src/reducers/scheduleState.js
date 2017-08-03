// import { GENERATOR_ACTIONS } from '../actions';
// todo
const init = [];

export default (state = init, action) => {
  // if (!GENERATOR_ACTIONS.includes(action.type)) {
  //   return state;
  // }
  // const [generateLeft, generateRight, dropdownGenerator] = GENERATOR_ACTIONS;
  switch (action.type) {
    // case generateLeft:
    //   return [
    //     ...genLeftPartCalendar(state[0]),
    //     ...state];
    // case generateRight:
    //   return [
    //     ...state,
    //     ...genRightPartCalendar(state[state.length - 1])];
    // case dropdownGenerator:
    //   return init;
    default:
      return state;
  }
};
