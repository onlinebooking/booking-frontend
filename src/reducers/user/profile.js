import { actionTypes } from 'redux-form';
import {
  UPDATE_USER_DATA_SUCCESS,
  //CLEAR_UPDATE_USER_DATA_MESSAGE
} from '../../constants/ActionTypes';

const { DESTROY } = actionTypes;

export default function profile(state = { succesUpdateData: false }, action) {
  const { type, form } = action;

  if (type === UPDATE_USER_DATA_SUCCESS) {
    return { ...state, succesUpdateData: true };
  }

  if (type === DESTROY && form === 'profile') {
    return { ...state, succesUpdateData: false };
  }

  return state;
};
