import { getFetcher } from '../api';

var createSimpleAction = function createSimpleAction(actionType) {
  return function (payload) {
    return {
      type: actionType,
      payload: payload
    };
  };
};

export var SET_APP_SIZE_ACTION = 'SET_APP_SIZE_ACTION';

export var setAppSizeAction = createSimpleAction(SET_APP_SIZE_ACTION);

export var GENERATOR_ACTIONS = ['GENERATE_LEFT', 'GENERATE_RIGTH', 'DROPDOWN_GENERATOR'];

export var generateLeftAction = createSimpleAction(GENERATOR_ACTIONS[0]);
export var generateRightAction = createSimpleAction(GENERATOR_ACTIONS[1]);
export var dropdownGeneratorAction = createSimpleAction(GENERATOR_ACTIONS[2]);

export var SCROLL_ACTIONS = ['SCROLL_LEFT', 'SCROLL_RIGHT', 'DROPDOWN_SCROLL', 'SCROLL_TO', 'SCROLL_TO_POSITION'];

export var scrollLeftAction = createSimpleAction(SCROLL_ACTIONS[0]);
export var scrollRightAction = createSimpleAction(SCROLL_ACTIONS[1]);
export var dropDownScrollAction = createSimpleAction(SCROLL_ACTIONS[2]);
export var scrollToAction = createSimpleAction(SCROLL_ACTIONS[3]);
export var scrollToPositionAction = createSimpleAction(SCROLL_ACTIONS[4]);

export var FETCHING_DATA = 'FETCHING_DATA';
export var FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export var FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export var getData = createSimpleAction(FETCHING_DATA);
export var getDataSuccess = createSimpleAction(FETCHING_DATA_SUCCESS);
export var getDataFailure = createSimpleAction(FETCHING_DATA_FAILURE);

export var SELECT_INDEX = 'SELECT_INDEX';

export var selectIndexAction = createSimpleAction(SELECT_INDEX);

export var fetchData = function fetchData(currentData) {
  var previousLoadedData = false;
  return function (dispatch) {
    if (previousLoadedData === currentData) {
      return;
    }
    previousLoadedData = currentData;
    dispatch(getData(currentData));
    getFetcher(currentData)({}).then(function (response) {
      if (response.status >= 400 && response.status < 500) {
        throw new Error('Bad response from server: ' + response.statusText);
      }
      return response.json();
    }).then(function (body) {
      dispatch(getDataSuccess(body));
    }).catch(function (error) {
      dispatch(getDataFailure(error));
    });
  };
};
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/actions/index.js.map