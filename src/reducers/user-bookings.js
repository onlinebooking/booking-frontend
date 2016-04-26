import simpleResList from './simple-res-list';
import {
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAILURE
} from '../constants/ActionTypes';

const userBookings = simpleResList([
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAILURE
]);

export default userBookings;
