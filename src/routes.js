import React from 'react';
import { Route, IndexRoute } from 'react-router';
import moment from 'moment';
import App from './containers/App';
import ShopsListPage from './containers/ShopsListPage';
import ShopDetailPage from './containers/ShopDetailPage';
import ServiceBooking from './containers/ServiceBooking';
import ServiceBookingCaledarPage from './containers/ServiceBookingCaledarPage';
import ServiceBookingAtDatePage from './containers/ServiceBookingAtDatePage';
import ServiceBookingRangePage from './containers/ServiceBookingRangePage';
import UserBookingsPage from './containers/UserBookingsPage';
import UserBookingDetailPage from './containers/UserBookingDetailPage';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  failureRedirectPath: '/',
  allowRedirectBack: false,
});

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ShopsListPage} />
    <Route path="shops/:shopId" component={ShopDetailPage} />
    <Route path="shops/:shopId/booking/:serviceId" component={ServiceBooking} >
      <IndexRoute component={ServiceBookingCaledarPage} />
      <Route path="at/:bookingDate" component={ServiceBookingAtDatePage} />
      <Route path="book/:rangeStart/:rangeEnd" component={UserIsAuthenticated(ServiceBookingRangePage)} />
    </Route>
    <Route path="my-bookings" component={UserIsAuthenticated(UserBookingsPage)} />
    <Route path="my-bookings/:bookingId" component={UserIsAuthenticated(UserBookingDetailPage)} />
  </Route>
);
