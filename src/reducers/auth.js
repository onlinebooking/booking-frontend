import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';

export default function auth(state={}, { type, data, error, token }) {
  switch (type) {
    case ActionTypes.USER_LOGIN_REQUEST:
    case ActionTypes.ME_REQUEST:
      return { ...state, loading: true };

    case ActionTypes.USER_LOGIN_FAILURE:
    case ActionTypes.ME_FAILURE:
      return { ...state, loading: false, error };

    case ActionTypes.USER_LOGIN_SUCCESS:
      return { ...state, token: data.token, error:null };

    case ActionTypes.ME_SUCCESS:
      return { ...state, user: data, loading: false, error: null };

    case ActionTypes.SET_USER_TOKEN:
      return { ...state, token };

    case ActionTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
}
