import { map as pluck } from 'lodash';
import { combineReducers } from 'redux';
import {
  HISTORY_USER_BOOKINGS_REQUEST,
  HISTORY_USER_BOOKINGS_SUCCESS,
  HISTORY_USER_BOOKINGS_FAILURE,
  SET_HISTORY_USER_BOOKINGS_PAGE,
  RESET_HISTORY_USER_BOOKINGS_PAGINATION
} from '../../constants/ActionTypes';

const initialPaginateListState = {
  isFetching: false,
  ids: [],
  pagination: {
    count: null,
    currentPage: 1,
    pageSize: 2,
  }
};
function historyUserBookingsPaginateList(state = initialPaginateListState, action) {
  const { type, data, pagination, page, pageSize } = action;

  // Valid pagination
  if (type === HISTORY_USER_BOOKINGS_SUCCESS || type === HISTORY_USER_BOOKINGS_FAILURE) {
    if (state.pagination.currentPage !== page || state.pagination.pageSize !== pageSize) {
      return state;
    }
  }

  if (type === HISTORY_USER_BOOKINGS_REQUEST) {
    return { ...state, isFetching: true };
  }

  if (type === HISTORY_USER_BOOKINGS_SUCCESS) {
    const { count } = pagination;
    const ids = pluck(action.data, 'id');
    return { ...state, ids, isFetching: false, pagination: {
      ...state.pagination,
      count
    }};
  }

  if (type === HISTORY_USER_BOOKINGS_FAILURE) {
    return {...state, isFetching: false };
  }

  if (type === SET_HISTORY_USER_BOOKINGS_PAGE) {
    return { ...state, pagination: {
      ...state.pagination,
      currentPage: page,
      count: null,
    }};
  }

  if (type === RESET_HISTORY_USER_BOOKINGS_PAGINATION) {
    return { ...state, pagination: {
      ...state.pagination,
      currentPage: 1,
      count: null,
    }};
  }

  return state;
}

export default combineReducers({
  //filters: combineReducers({
    //search: historyUserBookingsSearchFilter,
    //status: historyUserBookingsStatusFilter,
    //shop: historyUserBookingsShopFilter,
  //}),
  list: historyUserBookingsPaginateList,
});
