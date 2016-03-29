import { CALL_API } from '../middleware/api';
import * as ActionTypes from '../constants/ActionTypes';

function fetchShops() {
  return {
    entity: 'shops',
    isPageError: true,
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
      dispatch(fetchShops());
    }
  };
};

function fetchShop(shopId) {
  return {
    entity: 'shops',
    isPageError: true,
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
      dispatch(fetchShop(shopId));
    }
  };
};

function fetchShopServices(shopId) {
  return {
    shopId,
    isPageError: true,
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
      dispatch(fetchShopServices(shopId));
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
      dispatch(fetchShopService(shopId, serviceId));
    }
  };
};
