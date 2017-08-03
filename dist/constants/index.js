import _Math$trunc from 'babel-runtime/core-js/math/trunc';
var PATHNAME_PREFIX = '/'; // process.env.PUBLIC_URL;

export { PATHNAME_PREFIX };
export var APP_WIDTH = window.innerWidth;
export var CALENDAR_ITEM_WIDTH = 100;
export var CALENDAR_LENGTH = 101;
export var CALENDAR_TRESHOLD = _Math$trunc(CALENDAR_LENGTH / 2);
export var VISIBLE_ITEMS_COUNT = APP_WIDTH / 5 > 100 ? 7 : 5;
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/constants/index.js.map