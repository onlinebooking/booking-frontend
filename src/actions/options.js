import {
  SET_OPTION
} from '../constants/ActionTypes';

export const setIFrameMode = (options = {}) => ({
  type: SET_OPTION,
  key: 'iframe',
  value: options,
});
