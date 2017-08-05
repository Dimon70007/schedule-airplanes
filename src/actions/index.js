import { getFetcher } from '../api';

const createSimpleAction = actionType => payload => ({
  type: actionType,
  payload,
});

export const SET_APP_SIZE_ACTION = 'SET_APP_SIZE_ACTION';

export const setAppSizeAction = createSimpleAction(SET_APP_SIZE_ACTION);

export const GENERATOR_ACTIONS = ['GENERATE_LEFT', 'GENERATE_RIGTH', 'DROPDOWN_GENERATOR'];

export const generateLeftAction = createSimpleAction(GENERATOR_ACTIONS[0]);
export const generateRightAction = createSimpleAction(GENERATOR_ACTIONS[1]);
export const dropdownGeneratorAction = createSimpleAction(GENERATOR_ACTIONS[2]);

export const SCROLL_ACTIONS = ['SCROLL_LEFT', 'SCROLL_RIGHT', 'DROPDOWN_SCROLL', 'SCROLL_TO', 'SCROLL_TO_POSITION'];

export const scrollLeftAction = createSimpleAction(SCROLL_ACTIONS[0]);
export const scrollRightAction = createSimpleAction(SCROLL_ACTIONS[1]);
export const dropDownScrollAction = createSimpleAction(SCROLL_ACTIONS[2]);
export const scrollToAction = createSimpleAction(SCROLL_ACTIONS[3]);
export const scrollToPositionAction = createSimpleAction(SCROLL_ACTIONS[4]);

export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';


export const getData = createSimpleAction(FETCHING_DATA);
export const getDataSuccess = createSimpleAction(FETCHING_DATA_SUCCESS);
export const getDataFailure = createSimpleAction(FETCHING_DATA_FAILURE);

export const SELECT_INDEX = 'SELECT_INDEX';

export const selectIndexAction = createSimpleAction(SELECT_INDEX);

export const fetchData = (currentData) => {
  let previousLoadedData = false;
  return (dispatch) => {
    if (previousLoadedData === currentData) {
      return;
    }
    previousLoadedData = currentData;
    dispatch(getData(currentData));
    getFetcher(currentData)({})
      .then((response) => {
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`Bad response from server: ${response.statusText}`);
        }
        return response.json();
      })
      .then((body) => {
        dispatch(getDataSuccess(body));
      })
      .catch((error) => {
        dispatch(getDataFailure(error));
      });
  };
};
