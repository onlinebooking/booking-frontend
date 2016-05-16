import {
  RESET_PAGE_ERROR,
  SET_PAGE_ERROR
} from '../constants/ActionTypes';

export function resetPageError() {
  return {
    type: RESET_PAGE_ERROR
  };
};

export function setPageError(error) {
  return {
    error,
    type: SET_PAGE_ERROR
  };
};
