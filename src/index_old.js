// import { hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { AppContainer } from 'react-hot-loader';
// import Root from './containers/Root';
// import configureStore from './store/configureStore';

// const store = configureStore();
// const history = syncHistoryWithStore(hashHistory, store);
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

const render = () => (
  <Router>
    <div>
      <Route exact path='/item/:id' component={Preview} />
      <Route path='/' component={List} />
    </div>
  </Router>
);

const List = ({ children }) => {
  const list = [{ id: 1, title: 'This is title' }, { id: 2, title: 'This is another one' }];
  return (<div className='list'>
    {children}
    {list.map(I => (
      <Link to={`/item/${I.id}`} id={I.id}>
        {I.title}
      </Link>
    ))}
  </div>);
};

const Preview = ({ item }) => <div>This is list item preview</div>;

ReactDOM.render(
  render(),
  document.getElementById('root'),
);

// const render = () => {
//   ReactDOM.render(
//     <AppContainer>
//       <Root store={store} history={history} />
//     </AppContainer>,
//     document.getElementById('root'));
// };
// render();

// if (module.hot) {
//   module.hot.accept('./containers/Root', render);
// }
