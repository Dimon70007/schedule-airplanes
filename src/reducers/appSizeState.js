import { SET_APP_SIZE_ACTION } from '../actions';

const init = {
  height: window.innerHeight,
  width: window.innerWidth,
};

export default (state = init, action) => {
  if (action.type !== SET_APP_SIZE_ACTION) {
    return state;
  }
  return {
    ...state,
    ...action.payload,
  };
};
