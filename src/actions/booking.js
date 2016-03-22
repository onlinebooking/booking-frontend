import { CALL_API } from '../middleware/api';
import * as ActionTypes from '../constants/ActionTypes';
import moment from 'moment';

// Can do it better...
function calculateStartAndEnd(date) {
  const m = moment(date, 'YYYY-MM-DD');
  return {
    start: moment(m).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
    end: moment(m).add(1, 'month').endOf('month').format('YYYY-MM-DD')
  };
}

export function loadBookingRanges() {
  return (dispatch, getState) => {
    const bookingState = getState().booking;
    // No enought info for a booking request
    if (!bookingState.service || !bookingState.calendarDate) {
      return;
    }
    const service = bookingState.service;
    const { start, end } = calculateStartAndEnd(bookingState.calendarDate);
    const endpoint = `/calculate-ranges?start=${start}&end=${end}&service=${service}`;
    dispatch({
      service,
      start,
      end,
      requestedAt: Date.now(),
      [CALL_API]: {
        endpoint,
        types: [
          ActionTypes.BOOKING_RANGES_REQUEST,
          ActionTypes.BOOKING_RANGES_SUCCESS,
          ActionTypes.BOOKING_RANGES_FAILURE
        ]
      }
    });
  };
};

export function setViewedDate(date) {
  return {
    date,
    type: ActionTypes.SET_BOOKING_VIEWED_DATE
  };
};

export function setBookingService(service) {
  return {
    service,
    type: ActionTypes.SET_BOOKING_SERVICE
  };
};

export function setBookingCalendarDate(date) {
  return {
    date,
    type: ActionTypes.SET_BOOKING_CALENDAR_DATE
  };
};
