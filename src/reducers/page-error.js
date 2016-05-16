import { LOCATION_CHANGE } from 'react-router-redux'
import { includes } from 'lodash';
import {
  SET_PAGE_ERROR,
  RESET_PAGE_ERROR
} from '../constants/ActionTypes';

const initialState = {
  error: null
};

export default function pageError(state = initialState, { type, error, isPageError }) {
  if (error && isPageError && !includes([401], error.status)) {
    return { ...state, error };
  }

  // Explicit page error
  if (type === SET_PAGE_ERROR) {
    return { ...state, error };
  }

  // Reset page error wen location change or exmplicit action
  if (type === LOCATION_CHANGE || type === RESET_PAGE_ERROR) {
    return initialState;
  }

  return state;
};
