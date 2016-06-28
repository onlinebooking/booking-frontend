import {
  SET_OPTION
} from '../constants/ActionTypes';

export default function options(state = { iframe: false }, action) {
  const { type, key, value } = action;

  if (type === SET_OPTION) {
    return { ...state, [key]: value };
  }

  return state;
}
