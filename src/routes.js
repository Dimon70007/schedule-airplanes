import React from 'react';
import { Route } from 'react-router';
import { PATHNAME_PREFIX } from './constants';
import App from './containers/App';

const routes = (
  <Route path={`${PATHNAME_PREFIX}`} component={App}>
    {/* some children routes here */}
  </Route>
);

export default routes;
