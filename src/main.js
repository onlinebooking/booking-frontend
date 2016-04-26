import 'babel-polyfill';
import 'bootswatch/yeti/bootstrap.css';
import './scss/style.scss';
import React from 'react';
import ReactDom from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import { loginWithToken } from './actions/auth';
import Root from './containers/Root';
import moment from 'moment';

// Global localize moment for formatting stuff
moment.locale('it');

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const existingUserToken = localStorage.getItem('user_token');
if (existingUserToken) {
  store.dispatch(loginWithToken(existingUserToken));
}

ReactDom.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
