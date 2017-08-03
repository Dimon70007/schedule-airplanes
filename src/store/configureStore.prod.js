
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
// import promisesMiddleware from '../middleware/promises';


const logger = createLogger();
const configureStore = preloadedState => createStore(
  reducers,
  preloadedState,
  // logger пока оставил, чтоб видеть баги (для обучения)
  applyMiddleware(thunk, logger /* , promisesMiddleware*/),
);

export default configureStore;
