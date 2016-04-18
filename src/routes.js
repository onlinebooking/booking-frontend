import React from 'react';
import { Route, IndexRoute } from 'react-router';
import moment from 'moment';
import App from './containers/App';
import ShopsListPage from './containers/ShopsListPage';
import ShopDetailPage from './containers/ShopDetailPage';
import ServiceBooking from './containers/ServiceBooking';
import ServiceBookingCaledarPage from './containers/ServiceBookingCaledarPage';
import ServiceBookingAtDatePage from './containers/ServiceBookingAtDatePage';
//import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import {
  loadShops,
  loadShop,
  loadShopServices,
  loadShopService
} from './actions/shops';
import {
  setBookingService,
  loadBookingRanges,
  setBookingCalendarDate
} from './actions/booking';

export default (store) => (
  <Route path="/" component={App}>
    <IndexRoute component={ShopsListPage} onEnter={() => {
      store.dispatch(loadShops());
    }} />
    <Route path="shops/:shopId" component={ShopDetailPage} onEnter={(nextState) => {
      const { shopId } = nextState.params;
      store.dispatch(loadShop(shopId));
      store.dispatch(loadShopServices(shopId));
    }} />
    <Route path="shops/:shopId/booking/:serviceId" component={ServiceBooking} onEnter={(nextState) => {
      const { shopId, serviceId } = nextState.params;
      store.dispatch(loadShop(shopId));
      store.dispatch(loadShopService(shopId, serviceId));
      store.dispatch(setBookingService(serviceId));
    }}>
      <IndexRoute component={ServiceBookingCaledarPage} onEnter={(nextState) => {
        const { shopId, serviceId } = nextState.params;
        const calendarDate = moment(nextState.location.query.date, 'YYYY-MM-DD', true);
        if (calendarDate.isValid()) {
          store.dispatch(setBookingCalendarDate(calendarDate.format('YYYY-MM-DD')));
        }
        store.dispatch(loadBookingRanges());
      }} />
      <Route path="at/:bookingDate" component={ServiceBookingAtDatePage} onEnter={(nextState, redirect) => {
        const { bookingDate, shopId, serviceId } = nextState.params;
        if (moment(bookingDate, 'YYYY-MM-DD', true).isValid()) {
          store.dispatch(setBookingCalendarDate(bookingDate));
          store.dispatch(loadBookingRanges());
        } else {
          redirect(`/shops/${shopId}/booking/${serviceId}`);
        }
      }} />
    </Route>
  </Route>
);

/*
  <Route path="login" component={LoginPage} />
    <Route path="profile" component={ProfilePage} />
  </Route>

  */
