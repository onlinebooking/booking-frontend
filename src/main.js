import 'babel-polyfill';
import './scss/style.scss';
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import bootstrapStore from './store/bootstrapStore';
import Root from './containers/Root';
import moment from 'moment';

// Global localize moment for formatting stuff
moment.locale('it');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Fill store with various stuff
bootstrapStore(store);

ReactDom.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
