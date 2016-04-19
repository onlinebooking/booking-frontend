import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { routerMiddleware, push } from 'react-router-redux';
import { hashHistory } from 'react-router';
import api from '../middleware/api';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api, routerMiddleware(hashHistory))
  );
};