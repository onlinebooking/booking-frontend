import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux'
import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  loading: false,
  showModal: false,
  error: null,
  token: null,
  user: null,
};

export default function auth(state=initialState, { type, data, error, token }) {
  switch (type) {
    case ActionTypes.USER_LOGIN_REQUEST:
    case ActionTypes.ME_REQUEST:
      return { ...state, loading: true };

    case ActionTypes.USER_LOGIN_FAILURE:
    case ActionTypes.ME_FAILURE:
      return { ...state, loading: false, error };

    case ActionTypes.USER_LOGIN_SUCCESS:
      return { ...state, token: data.token, error: null };

    case ActionTypes.ME_SUCCESS:
      return { ...state, user: data, loading: false, error: null };

    case ActionTypes.SET_USER_TOKEN:
      return { ...state, token };

    case ActionTypes.USER_LOGOUT:
      return initialState;

    case ActionTypes.SHOW_MODAL_LOGIN:
      return { ...state, showModal: true, error: null };

    case ActionTypes.HIDE_MODAL_LOGIN:
    case LOCATION_CHANGE:
      return { ...state, showModal: false, error: null };

    default:
      return state;
  }
}
