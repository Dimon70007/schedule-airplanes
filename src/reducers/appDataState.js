import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../actions';

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true,
        dataFetched: false,
      };
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        error: false,
        data: action.payload,
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
