require('bootswatch/yeti/bootstrap.css');
require('./scss/style.scss')

import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDom from 'react-dom';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App';
import ShopsListPage from './containers/ShopsListPage';
import ShopDetailPage from './containers/ShopDetailPage';
import ServiceBookingPage from './containers/ServiceBookingPage'

import api from './middleware/api';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, api, createLogger())
);

//import {loadShopService} from './actions';

//store.dispatch(loadShopService(1, 3));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={ShopsListPage} />
            <Route path="/shops/:shopId" component={ShopDetailPage} />
            <Route path="/shops/:shopId/booking/:serviceId" component={ServiceBookingPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
