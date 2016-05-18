import { combineReducers } from 'redux';
import simpleResList from './utils/simple-res-list';
import {
  INCOMING_USER_BOOKINGS_REQUEST,
  INCOMING_USER_BOOKINGS_SUCCESS,
  INCOMING_USER_BOOKINGS_FAILURE,
  SET_INCOMING_USER_BOOKINGS_VIEW,
  SET_INCOMING_USER_BOOKINGS_STATUS_FILTER,
  SET_INCOMING_USER_BOOKINGS_SEARCH_FILTER,
  ACTION_ON_USER_BOOKING_REQUEST,
  ACTION_ON_USER_BOOKING_SUCCESS,
  ACTION_ON_USER_BOOKING_FAILURE,
  CLEAR_ACTION_ERROR_ON_USER_BOOKING
} from '../constants/ActionTypes';
import {
  INCOMING_USER_BOOKINGS_BY_SHOP,
  INCOMING_USER_BOOKINGS_LIST,
} from '../constants/ViewTypes';

const incomingUserBookingsList = simpleResList([
  INCOMING_USER_BOOKINGS_REQUEST,
  INCOMING_USER_BOOKINGS_SUCCESS,
  INCOMING_USER_BOOKINGS_FAILURE
]);

function incomingUserBookingsView(state = INCOMING_USER_BOOKINGS_LIST, action) {
  const { view, type } = action;

  if (type === SET_INCOMING_USER_BOOKINGS_VIEW) {
    return view;
  }

  return state;
}

function incomingUserBookingsSearchFilter(state = '', action) {
  const { search, type } = action;

  if (type === SET_INCOMING_USER_BOOKINGS_SEARCH_FILTER) {
    return search;
  }

  return state;
}

function incomingUserBookingsStatusFilter(state = null, action) {
  const { status, type } = action;

  if (type === SET_INCOMING_USER_BOOKINGS_STATUS_FILTER) {
    return status;
  }

  return state;
}

const initialUserBookingActionState = {
  isSaving: false,
  actionName: null,
  error: null,
};
function userBookingAction(state = initialUserBookingActionState, action) {
  if (action.type === ACTION_ON_USER_BOOKING_REQUEST) {
    return { ...state, isSaving: true, actionName: action.actionName, error: null };
  }

  if (action.type === ACTION_ON_USER_BOOKING_SUCCESS) {
    return { ...state, isSaving: false };
  }

  if (action.type === ACTION_ON_USER_BOOKING_FAILURE) {
    return { ...state, isSaving: false, error: action.error };
  }

  if (action.type === CLEAR_ACTION_ERROR_ON_USER_BOOKING) {
    return { ...state, error: null };
  }

  return state;
}

function userBookingsActions(state = {}, action) {
  switch (action.type) {

    case ACTION_ON_USER_BOOKING_REQUEST:
    case ACTION_ON_USER_BOOKING_SUCCESS:
    case ACTION_ON_USER_BOOKING_FAILURE:
    case CLEAR_ACTION_ERROR_ON_USER_BOOKING:
      return {
        ...state,
        [action.bookingId]: userBookingAction(state[action.bookingId], action)
      };

    default:
      return state;
  }
}

export default combineReducers({
  incoming: combineReducers({
    list: incomingUserBookingsList,
    filters: combineReducers({
      search: incomingUserBookingsSearchFilter,
      status: incomingUserBookingsStatusFilter,
    }),
    view: incomingUserBookingsView,
  }),
  actions: userBookingsActions,
});
