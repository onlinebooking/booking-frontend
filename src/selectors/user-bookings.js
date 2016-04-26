import { createSelector } from 'reselect';

function nestShop(model, shops) {
  return {...model, shop: shops[model.shop]};
}

function nestServiceShop(model, services, shops) {
  return {...model, service: nestShop(services[model.service], shops)};
}

const getBookingsEntity = (state) => state.entities.bookings;
const getUserBookingsIds = (state) => state.userBookings.ids;
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
