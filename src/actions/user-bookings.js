import { merge } from 'lodash';
import { CALL_API } from '../middleware/api';
import { jsonPostConfig, authTokenConfig } from './utils';
import { Schemas } from '../constants/Schemas';
import {
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAILURE,
  USER_BOOKING_REQUEST,
  USER_BOOKING_SUCCESS,
  USER_BOOKING_FAILURE,
  ACTION_ON_USER_BOOKING_REQUEST,
  ACTION_ON_USER_BOOKING_SUCCESS,
  ACTION_ON_USER_BOOKING_FAILURE,
  CLEAR_ACTION_ERROR_ON_USER_BOOKING
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
    if (!getState().userData.bookings.isFetching) {
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

export function actionOnUserBooking(bookingId, actionName) {
  return (dispatch, getState) => {
    const performedAction = getState().userData.bookings.actions[bookingId];

    // Another action performing, do nothing
    if (performedAction && performedAction.isSaving) {
      return;
    }

    return dispatch({
      bookingId,
      actionName,
      entitySchema: Schemas.BOOKING,
      [CALL_API]: {
        endpoint: `/bookings/${bookingId}/${actionName}/`,
        config: merge(authTokenConfig(getState()), jsonPostConfig()),
        types: [
          ACTION_ON_USER_BOOKING_REQUEST,
          ACTION_ON_USER_BOOKING_SUCCESS,
          ACTION_ON_USER_BOOKING_FAILURE
        ]
      }
    });
  };
};

export function clearActionErrorOnUserBooking(bookingId) {
  return {
    bookingId,
    type: CLEAR_ACTION_ERROR_ON_USER_BOOKING
  };
};
