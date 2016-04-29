import { createSelector } from 'reselect';

function nestShop(model, shops) {
  return {...model, shop: shops[model.shop]};
}

function nestServiceShop(model, services, shops) {
  return {...model, service: nestShop(services[model.service], shops)};
}

const getBookingsEntity = (state) => state.entities.bookings;
const getUserBookingsIds = (state) => state.userData.bookings.ids;
const getShopsEntity = (state) => state.entities.shops;
const getServicesEntity = (state) => state.entities.services;

export const getUserBookings = createSelector(
  [ getUserBookingsIds, getBookingsEntity, getServicesEntity, getShopsEntity ],
  (ids, bookings, services, shops) => ids.map(id => nestServiceShop(
    bookings[id],
    services,
    shops
  ))
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
