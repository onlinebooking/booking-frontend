import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
  error: null
};

export default function pageError(state = initialState, { type, error, isPageError }) {
  if (error && isPageError) {
    return { ...state, error };
  }

  // Reset page error wen location change
  if (type === LOCATION_CHANGE) {
    return initialState;
  }

  return state;
};
