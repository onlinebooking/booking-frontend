import { CALL_API } from '../middleware/api';
import moment from 'moment';
import { replace } from 'react-router-redux';
import {
  BOOKING_RANGES_REQUEST,
  BOOKING_RANGES_SUCCESS,
  BOOKING_RANGES_FAILURE,
  SET_BOOKING_VIEWED_DATE,
  SET_BOOKING_CALENDAR_DATE,
  SET_BOOKING_SERVICE,
} from '../constants/ActionTypes';

// Can do it better...
function calculateStartAndEndForCalendar(date) {
  const m = moment(date, 'YYYY-MM-DD');
  return {
    start: moment(m).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
    end: moment(m).add(1, 'month').endOf('month').format('YYYY-MM-DD')
  };
}

function calculateStartAndEndForSingleDay(date) {
  const m = moment(date, 'YYYY-MM-DD');
  return {
    start: date,
    end: moment(m).add(1, 'day').format('YYYY-MM-DD')
  };
}

export function loadBookingRanges(options = { loadSingleDay: false }) {
  return (dispatch, getState) => {
    const bookingState = getState().booking;

    // No enought info for a booking request
    if (!bookingState.service || !bookingState.calendarDate) {
      return;
    }

    const { service, calendarDate } = bookingState;
    const { loadSingleDay } = options;
    const { start, end } = loadSingleDay
      ? calculateStartAndEndForSingleDay(calendarDate)
      : calculateStartAndEndForCalendar(calendarDate);
    const endpoint = `/calculate-ranges?start=${start}&end=${end}&service=${service}`;

    dispatch({
      service,
      loadSingleDay,
      start,
      end,
      requestedAt: Date.now(),
      [CALL_API]: {
        endpoint,
        types: [
          BOOKING_RANGES_REQUEST,
          BOOKING_RANGES_SUCCESS,
          BOOKING_RANGES_FAILURE
        ]
      }
    });
  };
};

export function setViewedDate(date) {
  return {
    date,
    type: SET_BOOKING_VIEWED_DATE
  };
};

export function setBookingService(service) {
  return {
    service,
    type: SET_BOOKING_SERVICE
  };
};

export function setBookingCalendarDate(date, updateLocation = false) {
  return (dispatch, getState) => {
    dispatch({
      date,
      type: SET_BOOKING_CALENDAR_DATE
    });
    if (updateLocation) {
      const location = getState().routing.locationBeforeTransitions;
      dispatch(replace({ ...location, query: { date } }));
    }
  };
};
