import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDom from 'react-dom';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { loadShops } from './actions';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import ShopsListContainer from './containers/ShopsListContainer';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, createLogger())
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


class App extends React.Component {

  render() {

    store.dispatch(loadShops());

    return (
      <div>
        
      </div>
    
    );
  }
}


ReactDom.render(

  <Provider store={store}>
    /* Tell the Router to use our enhanced history */
    <App />
  </Provider>,
  
  document.getElementById('root')
)


