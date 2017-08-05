import url from 'url';
import { CALENDAR_ITEM_WIDTH } from '../constants';
// import querystring from 'querystring';

export const mergeurlQuery = (urlPath, params) => {
  const urlObj = url.parse(urlPath, true);
  const mergedQuery = { ...urlObj.query, ...params };
  const query = Object.entries(mergedQuery)
    .filter(([, value]) => (value !== null && value !== undefined))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }), {});
  return url.format({ ...urlObj, query, search: null });
};

export const idxToPosition = (index, windowWidth, itemWidth = CALENDAR_ITEM_WIDTH) => (
  (((index) * itemWidth) - (windowWidth / 2)) + (itemWidth / 2));

export const positionToIdx = (position, windowWidth, itemWidth = CALENDAR_ITEM_WIDTH) => (
  Math.trunc((position + (windowWidth / 2)) / itemWidth) - 1// calculate idx of centerPosition item
);

export const getVisibleItemsCount = (windowWidth, itemWidth = CALENDAR_ITEM_WIDTH) => (
  Math.trunc(windowWidth / itemWidth)
);

export * from './dateHelper';
