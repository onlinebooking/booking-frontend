import { CALL_API } from '../middleware/api';
import { jsonPostConfig, authTokenConfig } from './utils';
import { Schemas } from '../constants/Schemas';
import {
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAILURE,
  USER_BOOKING_REQUEST,
  USER_BOOKING_SUCCESS,
  USER_BOOKING_FAILURE
} from '../constants/ActionTypes';

function fetchUserBookings() {
  return (dispatch, getState) => {
    return dispatch({
      entitySchema: Schemas.BOOKING_ARRAY,
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

function fetchUserBooking(bookingId) {
  return (dispatch, getState) => {
    return dispatch({
      entitySchema: Schemas.BOOKING,
      isPageError: true,
      [CALL_API]: {
        endpoint: `/bookings/${bookingId}/`,
        config: authTokenConfig(getState()),
        types: [
          USER_BOOKING_REQUEST,
          USER_BOOKING_SUCCESS,
          USER_BOOKING_FAILURE
        ]
      }
    });
  };
};

export function loadUserBooking(bookingId) {
  return (dispatch, getState) => {
    // Always fetch the booking
    dispatch(fetchUserBooking(bookingId));
  };
};
