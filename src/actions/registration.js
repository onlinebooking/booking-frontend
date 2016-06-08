import { CALL_API } from '../middleware/api';
import { jsonPostConfig } from './utils';
import {
  CLEAR_REGISTRATION,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE
} from '../constants/ActionTypes';

export function register({name, email, password}) {
  return (dispatch, getState) => {
    // TODO: Handle the custom redirect...
    const baseUrl = window.location.origin;
    const redirect = `${baseUrl}/`;

    return dispatch({
      [CALL_API]: {
        endpoint: `/registration-request/`,
        config : jsonPostConfig({name, email, password, redirect}),
        types: [
          USER_REGISTRATION_REQUEST,
          USER_REGISTRATION_SUCCESS,
          USER_REGISTRATION_FAILURE
        ]
      }
    });
  };
}

export const clearRegistration = () => ({
  type: CLEAR_REGISTRATION
});
