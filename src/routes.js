import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ShopsListPage from './containers/ShopsListPage';
import ShopDetailPage from './containers/ShopDetailPage';
import ServiceBooking from './containers/ServiceBooking';
import ServiceBookingCaledarPage from './containers/ServiceBookingCaledarPage';
import ServiceBookingAtDatePage from './containers/ServiceBookingAtDatePage';
import ServiceBookingRangePage from './containers/ServiceBookingRangePage';
import IncomingUserBookingsPage from './containers/IncomingUserBookingsPage';
import UserBookingDetailPage from './containers/UserBookingDetailPage';
import NotFoundPage from './components/NotFoundPage';
import Spinner from './components/Spinner';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user,
  authenticatingSelector: state => state.auth.loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  LoadingComponent: Spinner,
  failureRedirectPath: '/',
  allowRedirectBack: false,
});

//<Route path="my-bookings/history" component={UserIsAuthenticated(HistoryUserBookingsPage)} />
export default (
  <Route path="/" component={App}>
    <IndexRoute component={ShopsListPage} />
    <Route path="shops/:shopId" component={ShopDetailPage} />
    <Route path="shops/:shopId/booking/:serviceId" component={ServiceBooking} >
      <IndexRoute component={ServiceBookingCaledarPage} />
      <Route path="at/:bookingDate" component={ServiceBookingAtDatePage} />
      <Route path="book/:rangeStart/:rangeEnd" component={UserIsAuthenticated(ServiceBookingRangePage)} />
    </Route>
    <Route path="my-bookings/incoming(/:view)" component={UserIsAuthenticated(IncomingUserBookingsPage)} />
    <Route path="my-bookings/:bookingId" component={UserIsAuthenticated(UserBookingDetailPage)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
