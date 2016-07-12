import { actionTypes } from 'redux-form';
import {
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_PASSWORD_SUCCESS
} from '../../constants/ActionTypes';

const { DESTROY } = actionTypes;

const initialState = {
  succesUpdateData: false,
  succesUpdatePassword: false,
};
export default function profile(state = initialState, action) {
  const { type, form } = action;

  // User Data

  if (type === UPDATE_USER_DATA_SUCCESS) {
    return { ...state, succesUpdateData: true };
  }

  if (type === DESTROY && form === 'update-user-data') {
    return { ...state, succesUpdateData: false };
  }

  // User Password

  if (type === UPDATE_USER_PASSWORD_SUCCESS) {
    return { ...state, succesUpdatePassword: true };
  }

  if (type === DESTROY && form === 'update-user-password') {
    return { ...state, succesUpdatePassword: false };
  }


  return state;
};
