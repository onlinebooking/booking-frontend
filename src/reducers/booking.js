import { combineReducers } from 'redux';
import { groupBy, pick, omit, merge } from 'lodash';
import moment from 'moment';
import {
  SET_BOOKING_SERVICE,
  SET_BOOKING_CALENDAR_DATE,
  SET_BOOKING_VIEWED_DATE,
  BOOKING_RANGES_REQUEST,
  BOOKING_RANGES_SUCCESS,
  BOOKING_RANGES_FAILURE
} from '../constants/ActionTypes';

function viewedDate(state=null, action) {
  if (action.type === SET_BOOKING_VIEWED_DATE) {
    return action.date;
  }

  return state;
}

function mapRangesByStartDay(ranges) {
  return groupBy(ranges, range => {
    return moment(range.start).format('YYYY-MM-DD');
  });
}

const initialRangesState = {
  items: {},
  isFetching: false,
  error: null,
  lastRequestedAt: null,
  lastSuceessedAt: null,
};
function ranges(state=initialRangesState, action) {
  if (action.type === BOOKING_RANGES_REQUEST) {
    return { ...state, isFetching: true, lastRequestedAt: action.requestedAt };
  }

  if (action.type === BOOKING_RANGES_SUCCESS) {
    let nextState = state;

    if (!state.lastSuceessedAt || action.requestedAt > state.lastSuceessedAt) {
      let items = mapRangesByStartDay(action.data);
      // We know we have only a single day, smart 'merge' it instead of replace
      if (action.loadSingleDay) {
        items = merge(omit(state.items, action.start), pick(items, action.start));
      }
      nextState = { ...nextState, items, lastSuceessedAt: action.requestedAt, error: null };
    }

    // No pending request!
    if (!state.lastRequestedAt || action.requestedAt === state.lastRequestedAt) {
      nextState = { ...nextState, isFetching: false };
    }

    return nextState;
  }

  if (action.type === BOOKING_RANGES_FAILURE) {
    let nextState = state;

    if (!state.lastSuceessedAt || action.requestedAt > state.lastSuceessedAt) {
      nextState = { ...nextState, error: action.error };
    }

    // No pending request!
    if (!state.lastRequestedAt || action.requestedAt === state.lastRequestedAt) {
      nextState = { ...nextState, isFetching: false };
    }

    return nextState;
  }

  // Service of booking is changed, can't accept request prior to now
  if (action.type === SET_BOOKING_SERVICE) {
    return { ...state, lastRequestedAt: Date.now(), lastSuceessedAt: Date.now() };
  }

  return state;
}

function calendarDate(state, action) {
  if (typeof state === 'undefined') {
    return moment().format('YYYY-MM-DD');
  }

  if (action.type === SET_BOOKING_CALENDAR_DATE) {
    return action.date;
  }

  return state;
}

function service(state=null, action) {
  if (action.type === SET_BOOKING_SERVICE) {
    return action.service;
  }

  return state;
}

const bookingReducer = combineReducers({
    service,
    calendarDate,
    ranges,
    viewedDate,
});

export default function bookingReducerWithReset(state, action) {
  // Reset state when set a new service of booking
  if (action.type === SET_BOOKING_SERVICE) {
    return bookingReducer(undefined, action);
  }

  return bookingReducer(state, action);
};
