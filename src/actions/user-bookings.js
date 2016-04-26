import { CALL_API } from '../middleware/api';
import { jsonPostConfig, authTokenConfig } from './utils';
import {
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAILURE
} from '../constants/ActionTypes';

function fetchUserBookings() {
  return (dispatch, getState) => {
    console.log(authTokenConfig(getState()));
    return dispatch({
      entity: 'bookings',
      isPageError: true,
      [CALL_API]: {
        endpoint: '/bookings/',
        config: authTokenConfig(getState()),
        types: [
          USER_BOOKINGS_REQUEST,
          USER_BOOKINGS_SUCCESS,
          USER_BOOKINGS_FAILURE
        ]
      }
    });
  };
};

export function loadUserBookings() {
  return (dispatch, getState) => {
    if (!getState().userBookings.isFetching) {
      dispatch(fetchUserBookings());
    }
  };
};
