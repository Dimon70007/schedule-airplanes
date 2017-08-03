const PATHNAME_PREFIX = '/'; // process.env.PUBLIC_URL;

export {
  PATHNAME_PREFIX,
};
export const APP_WIDTH = window.innerWidth;
export const CALENDAR_ITEM_WIDTH = 100;
export const CALENDAR_LENGTH = 101;
export const CALENDAR_TRESHOLD = Math.trunc(CALENDAR_LENGTH / 2);
export const VISIBLE_ITEMS_COUNT = (APP_WIDTH / 5) > 100 ? 7 : 5;
