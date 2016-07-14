import { set } from 'lodash';
import { CALL_API } from '../middleware/api';
import { Schemas } from '../constants/Schemas';
import { isPageError, setPageError } from './page-error';
import { checkResponse } from './utils';
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

const fetchShops = () => ({
  entitySchema: Schemas.SHOP_ARRAY,
  ...isPageError(),
  [CALL_API]: {
    endpoint: '/shops',
    types: [
      SHOPS_REQUEST,
      SHOPS_SUCCESS,
      SHOPS_FAILURE
    ]
  }
});

export const loadShops = () => (dispatch, getState) => {
  if (!getState().homeShops.isFetching) {
    dispatch(fetchShops());
  }
};

const fetchShop = (shopDomainName) => ({
  entitySchema: Schemas.SHOP,
  ...isPageError(),
  [CALL_API]: {
    endpoint: `/shops-by-domain/${shopDomainName}`,
    types: [
      SHOP_REQUEST,
      SHOP_SUCCESS,
      SHOP_FAILURE
    ]
  }
});

function loadShop(shopDomainName) {
  return (dispatch, getState) => {
    const shop = getState().entities.shops[shopDomainName];
    if (!shop) {
      return dispatch(fetchShop(shopDomainName)).then(checkResponse);
    }
    return Promise.resolve(shop);
  };
};

const fetchShopServices = (shop) => ({
  shopId: shop.id,
  shopDomainName: shop.domain_name,
  ...isPageError(),
  entitySchema: Schemas.SERVICE_ARRAY,
  [CALL_API]: {
    endpoint: `/shops/${shop.id}/services`,
    types: [
      SHOP_SERVICES_REQUEST,
      SHOP_SERVICES_SUCCESS,
      SHOP_SERVICES_FAILURE
    ],
    transform: (service) => set(service, 'shop', shop.domain_name)
  }
});

export const loadShopAndServices = (shopDomainName) => (dispatch, getState) => {
  dispatch(loadShop(shopDomainName))
    .then(shop => {
      if (shop && !getState().shopServices[shopDomainName]) {
        dispatch(fetchShopServices(shop));
      }
    });
};

const fetchShopService = (shop, serviceId) => ({
  entitySchema: Schemas.SERVICE,
  ...isPageError(),
  [CALL_API]: {
    endpoint: `/shops/${shop.id}/services/${serviceId}`,
    types: [
      SHOP_SERVICE_REQUEST,
      SHOP_SERVICE_SUCCESS,
      SHOP_SERVICE_FAILURE
    ]
  },
  transform: (service) => set(service, 'shop', shop.domain_name)
});

export const loadShopAndService = (shopDomainName, serviceId) => (dispatch, getState) => {
  dispatch(loadShop(shopDomainName))
    .then(shop => {
      if (shop) {
        const service = getState().entities.services[serviceId];
        if (!service) {
          dispatch(fetchShopService(shop, serviceId));
        } else if (service.shop !== shop.domain_name) {
          // Force 404...
          dispatch(setPageError({
            status: 404,
            statusText: 'Not Found'
          }));
        }
      }
    });
};
