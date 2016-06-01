import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import api from '../middleware/api';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api, routerMiddleware(browserHistory))
  );
};
