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
import LoginPage from './containers/LoginPage'

import api from './middleware/api';
import {
  loginWithToken,
  loadShops,
  loadShop,
  loadShopServices,
  loadShopService,
  setBookingService,
  loadBookingRanges
} from './actions';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, api, createLogger())
);


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

const existingUserToken = localStorage.getItem('user_token');
if (existingUserToken) {
  store.dispatch(loginWithToken(existingUserToken))
}

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={ShopsListPage} onEnter={() => {
              store.dispatch(loadShops());
            }} />
            <Route path="/login" component={LoginPage} />
            <Route path="/shops/:shopId" component={ShopDetailPage} onEnter={(nextState) => {
              const { shopId } = nextState.params;
              store.dispatch(loadShop(shopId));
              store.dispatch(loadShopServices(shopId));
            }} />
            <Route path="/shops/:shopId/booking/:serviceId" component={ServiceBookingPage} onEnter={(nextState) => {
              const { shopId, serviceId } = nextState.params;
              store.dispatch(loadShop(shopId));
              store.dispatch(loadShopService(shopId, serviceId));
              store.dispatch(setBookingService(serviceId));
              store.dispatch(loadBookingRanges());
            }} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
