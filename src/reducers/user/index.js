import { combineReducers } from 'redux';
import bookings from './bookings';
import profile from './profile';
import resetOnLogout from '../utils/reset-on-logout';

export default resetOnLogout(combineReducers({
  bookings,
  profile,
}));
