import {
  SET_OPTION
} from '../constants/ActionTypes';

export const setIFrameMode = (value) => ({
  type: SET_OPTION,
  key: 'iframe',
  value
});
