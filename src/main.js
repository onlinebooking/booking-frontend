require('bootstrap/dist/css/bootstrap.css');

import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDom from 'react-dom';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { loadShops } from './actions';
import createLogger from 'redux-logger';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import { App } from './containers/App';
import ShopsListContainer from './containers/ShopsListContainer';
import ShopDetailContainer from './containers/ShopDetailContainer';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, createLogger())
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);



ReactDom.render(

  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={ShopsListContainer} />
            <Route path="/shops/:shopId" component={ShopDetailContainer} />
      </Route>
    </Router>
  </Provider>,
  
  document.getElementById('root')
)


