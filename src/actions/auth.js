import { CALL_API } from '../middleware/api';
import * as ActionTypes from '../constants/ActionTypes';
import { jsonPostConfig, authTokenConfig } from './utils';

function loginRequest({email, password}) {
  return {
    [CALL_API]: {
      endpoint: `/auth/`,
      config : jsonPostConfig({email, password}),
      types: [
        ActionTypes.USER_LOGIN_REQUEST,
        ActionTypes.USER_LOGIN_SUCCESS,
        ActionTypes.USER_LOGIN_FAILURE
      ]
    }
  };
};

function meRequest() {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/me/`,
        config : authTokenConfig(getState()),
        types: [
          ActionTypes.ME_REQUEST,
          ActionTypes.ME_SUCCESS,
          ActionTypes.ME_FAILURE
        ]
      }
    })
  };
};

export function login({email, password}) {
  return (dispatch, getState) => {
    const giveMeToken = () => Promise.resolve(getState().auth.token);
    dispatch(loginRequest({email, password}))
    .then(giveMeToken)
    .then((token) => {
      if (token) {
        dispatch(meRequest())
        .then(giveMeToken)
        // if login is ok but me failed in some part of application
        // a logout will be dispatched and token will be erased from the state
        // then this implementation will have (more) sense
        .then((token) => {
          if (token) {
            localStorage.setItem('user_token', token);
            // Also hide the login modal
            dispatch(hideModalLogin());
          }
        });
      }
    });
  };
};

export function logout() {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_LOGOUT });
    localStorage.removeItem('user_token');
  };
}

export function loginWithToken(token) {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SET_USER_TOKEN, token });
    dispatch(meRequest());
  };
};

export function showModalLogin() {
  return { type: ActionTypes.SHOW_MODAL_LOGIN };
};

export function hideModalLogin() {
  return { type: ActionTypes.HIDE_MODAL_LOGIN };
};
