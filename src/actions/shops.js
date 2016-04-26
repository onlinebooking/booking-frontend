import { CALL_API } from '../middleware/api';
import { Schemas } from '../constants/Schemas';
import {
  SHOPS_REQUEST,
  SHOPS_SUCCESS,
  SHOPS_FAILURE,
  SHOP_REQUEST,
  SHOP_SUCCESS,
  SHOP_FAILURE,
  SHOP_SERVICES_REQUEST,
  SHOP_SERVICES_SUCCESS,
  SHOP_SERVICES_FAILURE,
  SHOP_SERVICE_REQUEST,
  SHOP_SERVICE_SUCCESS,
  SHOP_SERVICE_FAILURE
} from '../constants/ActionTypes';

function fetchShops() {
  return {
    entitySchema: Schemas.SHOP_ARRAY,
    isPageError: true,
    [CALL_API]: {
      endpoint: '/shops',
      types: [
        SHOPS_REQUEST,
        SHOPS_SUCCESS,
        SHOPS_FAILURE
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
    entitySchema: Schemas.SHOP,
    isPageError: true,
    [CALL_API]: {
      endpoint: `/shops/${shopId}`,
      types: [
        SHOP_REQUEST,
        SHOP_SUCCESS,
        SHOP_FAILURE
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
    entitySchema: Schemas.SERVICE_ARRAY,
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services`,
      types: [
        SHOP_SERVICES_REQUEST,
        SHOP_SERVICES_SUCCESS,
        SHOP_SERVICES_FAILURE
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
    entitySchema: Schemas.SERVICE,
    isPageError: true,
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services/${serviceId}`,
      types: [
        SHOP_SERVICE_REQUEST,
        SHOP_SERVICE_SUCCESS,
        SHOP_SERVICE_FAILURE
      ]
    }
  }
}

export function loadShopService(shopId, serviceId) {
  return (dispatch, getState) => {
    const service = getState().entities.services[serviceId];
    if (! service) {
      dispatch(fetchShopService(shopId, serviceId));
    } else if (Number(service.shop) !== Number(shopId)) {
      // Force 404...
      dispatch({
        type: SHOP_SERVICES_FAILURE,
        isPageError: true,
        error: { status: 404, statusText: 'Not Found' }
      });
    }
  };
};
