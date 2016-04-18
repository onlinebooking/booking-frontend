import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  SET_USER_TOKEN,
  USER_LOGOUT,
  SHOW_MODAL_LOGIN,
  HIDE_MODAL_LOGIN
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  showModal: false,
  error: null,
  token: null,
  user: null,
};

export default function auth(state=initialState, { type, data, error, token }) {
  switch (type) {
    case USER_LOGIN_REQUEST:
    case ME_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_FAILURE:
    case ME_FAILURE:
      return { ...state, loading: false, error };

    case USER_LOGIN_SUCCESS:
      return { ...state, token: data.token, error: null };

    case ME_SUCCESS:
      return { ...state, user: data, loading: false, error: null };

    case SET_USER_TOKEN:
      return { ...state, token };

    case USER_LOGOUT:
      return initialState;

    case SHOW_MODAL_LOGIN:
      return { ...state, showModal: true, error: null };

    case HIDE_MODAL_LOGIN:
    case LOCATION_CHANGE:
      return { ...state, showModal: false, error: null };

    default:
      return state;
  }
}
