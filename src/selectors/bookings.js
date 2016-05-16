import { createSelector } from 'reselect';
import { groupBy, transform } from 'lodash';
import {
  INCOMING_USER_BOOKINGS_BY_SHOP,
  INCOMING_USER_BOOKINGS_LIST,
} from '../constants/ViewTypes';

function nestShop(model, shops) {
  return {...model, shop: shops[model.shop]};
}

function nestServiceShop(model, services, shops) {
  return {...model, service: nestShop(services[model.service], shops)};
}

const getBookingsEntity = (state) => state.entities.bookings;
const getUserBookingsIds = (state) => state.userData.bookings.incoming.list.ids;
const getShopsEntity = (state) => state.entities.shops;
const getServicesEntity = (state) => state.entities.services;

const getUserBookings = createSelector(
  [ getUserBookingsIds, getBookingsEntity, getServicesEntity, getShopsEntity ],
  (ids, bookings, services, shops) => ids.map(id => nestServiceShop(
    bookings[id],
    services,
    shops
  ))
);

const getUserBookingsView = (state) => state.userData.bookings.incoming.view;
export const getUserBookingsViewed = createSelector(
  [ getUserBookings, getUserBookingsView ],
  (bookings, view) => {
    switch (view) {
      case INCOMING_USER_BOOKINGS_BY_SHOP:
        return transform(groupBy(bookings, 'service.shop.id'), (r, v, k) => {
          const { service: { shop } } = v[0];
          r.push({ shop, bookings: v });
        }, []);
      case INCOMING_USER_BOOKINGS_LIST:
        return bookings;
      default:
        return bookings;
    }
  }
);

const getUserBooking = (state, props) =>
  state.entities.bookings[props.params.bookingId];

export const makeGetUserBooking = () => {
  return createSelector(
    [ getUserBooking, getServicesEntity, getShopsEntity ],
    (booking, services, shops) => (
      typeof booking === 'undefined'
      ? null
      : nestServiceShop(booking, services, shops)
    )
  );
};

const getBookedRangeId = (state) => state.booking.book.id;

export const getBookedRange = createSelector(
  [ getBookedRangeId, getBookingsEntity, getServicesEntity, getShopsEntity ],
  (id, bookings, services, shops) => (
    id === null
    ? null
    : nestServiceShop(bookings[id], services, shops)
  )
);
