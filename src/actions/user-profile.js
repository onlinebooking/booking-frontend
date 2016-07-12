import { merge } from 'lodash';
import { CALL_API } from '../middleware/api';
import { jsonPutConfig, authTokenConfig } from './utils';
import {
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILURE
} from '../constants/ActionTypes';

export const updateUserData = ({name, email}) => (dispatch, getState) => dispatch({
  [CALL_API]: {
    endpoint: `/me/`,
    shouldUpdateUserToken: true,
    config: merge(authTokenConfig(getState()), jsonPutConfig({
      name,
      email,
    })),
    types: [
      UPDATE_USER_DATA_REQUEST,
      UPDATE_USER_DATA_SUCCESS,
      UPDATE_USER_DATA_FAILURE,
    ]
  }
});

export const updateUserPassword = (password) => (dispatch, getState) => dispatch({
  [CALL_API]: {
    endpoint: `/me/password/`,
    shouldUpdateUserToken: true,
    config: merge(authTokenConfig(getState()), jsonPutConfig({
      password
    })),
    types: [
      UPDATE_USER_PASSWORD_REQUEST,
      UPDATE_USER_PASSWORD_SUCCESS,
      UPDATE_USER_PASSWORD_FAILURE,
    ]
  }
});
