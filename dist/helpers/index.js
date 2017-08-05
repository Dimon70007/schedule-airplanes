import _Math$trunc from 'babel-runtime/core-js/math/trunc';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$entries from 'babel-runtime/core-js/object/entries';
import _extends from 'babel-runtime/helpers/extends';
import url from 'url';
import { CALENDAR_ITEM_WIDTH } from '../constants';
// import querystring from 'querystring';

export var mergeurlQuery = function mergeurlQuery(urlPath, params) {
  var urlObj = url.parse(urlPath, true);
  var mergedQuery = _extends({}, urlObj.query, params);
  var query = _Object$entries(mergedQuery).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        value = _ref2[1];

    return value !== null && value !== undefined;
  }).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return _extends({}, acc, _defineProperty({}, key, value));
  }, {});
  return url.format(_extends({}, urlObj, { query: query, search: null }));
};

export var idxToPosition = function idxToPosition(index, windowWidth) {
  var itemWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CALENDAR_ITEM_WIDTH;
  return index * itemWidth - windowWidth / 2 + itemWidth / 2;
};

export var positionToIdx = function positionToIdx(position, windowWidth) {
  var itemWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CALENDAR_ITEM_WIDTH;
  return _Math$trunc((position + windowWidth / 2) / itemWidth) - 1 // calculate idx of centerPosition item
  ;
};

export var getVisibleItemsCount = function getVisibleItemsCount(windowWidth) {
  var itemWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CALENDAR_ITEM_WIDTH;
  return _Math$trunc(windowWidth / itemWidth);
};

export * from './dateHelper';
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/helpers/index.js.map