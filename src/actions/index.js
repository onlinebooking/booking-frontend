import { CALL_API } from '../middleware/api';
import * as ActionTypes from '../constants/ActionTypes';
import moment from 'moment';
//import { keys, keyBy, isArray } from "lodash";

function fetchShops() {
  return {
    entity: 'shops',
    [CALL_API]: {
      endpoint: '/shops',
      types: [
        ActionTypes.SHOPS_REQUEST,
        ActionTypes.SHOPS_SUCCESS,
        ActionTypes.SHOPS_FAILURE
      ]
    }
  };
};

export function loadShops() {
  return (dispatch, getState) => {
    if (!getState().homeShops.isFetching) {
      return dispatch(fetchShops());
    }
  };
};

function fetchShop(shopId) {
  return {
    entity: 'shops',
    [CALL_API]: {
      endpoint: `/shops/${shopId}`,
      types: [
        ActionTypes.SHOP_REQUEST,
        ActionTypes.SHOP_SUCCESS,
        ActionTypes.SHOP_FAILURE
      ]
    }
  };
};

export function loadShop(shopId) {
  return (dispatch, getState) => {
    if (! getState().entities.shops[shopId]) {
      return dispatch(fetchShop(shopId));
    }
  };
};

function fetchShopServices(shopId) {
  return {
    shopId,
    entity: 'services',
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services`,
      types: [
        ActionTypes.SHOP_SERVICES_REQUEST,
        ActionTypes.SHOP_SERVICES_SUCCESS,
        ActionTypes.SHOP_SERVICES_FAILURE
      ]
    }
  }
}

export function loadShopServices(shopId) {
  return (dispatch, getState) => {
    if (! getState().shopServices[shopId]) {
      return dispatch(fetchShopServices(shopId));
    }
  };
};

function fetchShopService(shopId, serviceId) {
  return {
    entity: 'services',
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services/${serviceId}`,
      types: [
        ActionTypes.SHOP_SERVICE_REQUEST,
        ActionTypes.SHOP_SERVICE_SUCCESS,
        ActionTypes.SHOP_SERVICE_FAILURE
      ]
    }
  }
}

export function loadShopService(shopId, serviceId) {
  return (dispatch, getState) => {
    if (! getState().entities.services[serviceId]) {
      return dispatch(fetchShopService(shopId, serviceId));
    }
  };
};


export function setBookingData(data){
    return {
        type : ActionTypes.SET_BOOKING_DATA,
        ...data
    };
}


export function setCurrentBookingRange(idx){
    return {
        type : ActionTypes.SET_BOOKING_RANGE,
        idx
    };
}

export function requestBookingRanges() {

  return (dispatch, getState) => {

    const { start, end, service } = getState().booking.data;
    const endpoint = `/calculate-ranges?start=${start}&end=${end}&service=${service}`;
    dispatch({
      [CALL_API]: {
        endpoint,
        types: [
          ActionTypes.RANGES_REQUEST,
          ActionTypes.RANGES_SUCCESS,
          ActionTypes.RANGES_FAILURE
        ]
      },
      requestedAt : Date.now()
    })

  }
};

 



