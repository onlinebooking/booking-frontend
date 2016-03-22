import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';
import { groupBy } from 'lodash';
import moment from 'moment';

function viewedDate(state=null, action) {
  if (action.type === ActionTypes.SET_BOOKING_VIEWED_DATE) {
    return action.date;
  }

  return state;
}

function mapRangesByStartDay(ranges) {
  return groupBy(ranges, range => {
    return moment(range.start).format('YYYY-MM-DD');
  });
}

function ranges(state={items: {}, requestedAt: null}, action) {
  if (action.type === ActionTypes.BOOKING_RANGES_SUCCESS) {
    if (!state.requestedAt || action.requestedAt > state.requestedAt) {
      const items = mapRangesByStartDay(action.data);
      return { ...state, items, requestedAt: action.requestedAt };
    }
  }

  // Service of booking is changed, can't accept request prior to now
  if (action.type === ActionTypes.SET_BOOKING_SERVICE) {
    return { ...state, requestedAt: Date.now() };
  }

  return state;
}

function calendarDate(state, action) {
  if (typeof state === 'undefined') {
    return moment().format('YYYY-MM-DD');
  }

  if (action.type === ActionTypes.SET_BOOKING_CALENDAR_DATE) {
    return action.date;
  }

  return state;
}

function service(state=null, action) {
  if (action.type === ActionTypes.SET_BOOKING_SERVICE) {
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
  if (action.type === ActionTypes.SET_BOOKING_SERVICE) {
    return bookingReducer(undefined, action);
  }

  return bookingReducer(state, action);
};
