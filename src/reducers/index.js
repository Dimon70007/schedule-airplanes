import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import calendarState from './calendarState';
import scheduleState from './scheduleState';
import scrollState from './scrollState';
import appData from './appDataState';
import appSize from './appSizeState';
// import { PREFIX_OF_ACTION } from '../constants';

const reducer = combineReducers({
  // routing: routerReducer, // => state.routing
  // PREFIX_OF_ACTION: myImportedReducer,
  calendarState,
  scheduleState,
  scrollState,
  appData,
  appSize,
});

export default reducer;
