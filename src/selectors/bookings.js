import { createSelector } from 'reselect';
import { groupBy, transform, identity, curry, flow } from 'lodash';
import { searchRegExp } from '../utils/regex';
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

// List of user bookings with nested relation for UI
const getUserBookings = createSelector(
  [ getUserBookingsIds, getBookingsEntity, getServicesEntity, getShopsEntity ],
  (ids, bookings, services, shops) => ids.map(id => nestServiceShop(
    bookings[id],
    services,
    shops
  ))
);

const getUserBookingsSearchFilter = (state) => state.userData.bookings.incoming.filters.search;
const getUserBookingsStatusFilter = (state) => state.userData.bookings.incoming.filters.status;

// List of user bookings filtered by state
const getUserBookingsFiltered = createSelector(
  [ getUserBookings, getUserBookingsSearchFilter, getUserBookingsStatusFilter ],
  (bookings, search, status) => {
    // Relax, this mean no filter stuff when falsy value given
    const maybeFilter = fn => v => v ? curry(fn)(v) : identity;

    const searchFilter = (search, booking) => {
      const regex = searchRegExp(search);
      return booking.service.name.match(regex) ||
             booking.service.shop.name.match(regex);
    };
    const statusFilter = (status, booking) => booking.status === status;

    return flow(
      bookings => bookings.filter(maybeFilter(searchFilter)(search)),
      bookings => bookings.filter(maybeFilter(statusFilter)(status))
    )(bookings);
  }
);

const getUserBookingsView = (state) => state.userData.bookings.incoming.view;

// List of user bookings filtered and viewed
export const getUserBookingsFilteredAndViewed = createSelector(
  [ getUserBookingsFiltered, getUserBookingsView ],
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
