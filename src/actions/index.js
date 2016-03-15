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
    const shop = getState().entities.shops[shopId];
    if (shop) {
      return Promise.resolve(shop);
    }
    return dispatch(fetchShop(shopId));
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


function setAuthTokenConfig(state, config={headers : { }}){
  const authtoken = state.auth ? "JWT " + state.auth.token : null;
  return { ...config, headers : { ...config.headers, Authorization:authtoken }}
}


function jsonPostConfig(body){

  return {
     method: 'post',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}


function loginRequest({email, password}) {
  return {
    [CALL_API]: {
      endpoint: `/auth/`,
      config : jsonPostConfig({email, password}),
      types: [
        ActionTypes.USER_LOGIN_REQUEST,
        ActionTypes.USER_LOGIN_SUCCESS,
        ActionTypes.USER_LOGIN_FAILURE
      ]
    }
  };
};


function meRequest() {
  return (dispatch, getState) => {
    dispatch({
      [CALL_API]: {
        endpoint: `/me/`,
        config : setAuthTokenConfig(getState()),
        types: [
          ActionTypes.ME_REQUEST,
          ActionTypes.ME_SUCCESS,
          ActionTypes.ME_FAILURE
        ]
      }
    })
  }
};



export function login({email, password}) {
  return (dispatch, getState) => {
    dispatch(loginRequest({email, password}))
    .then(()=>{
      dispatch(meRequest())
    })
    .then(() => {
      localStorage.setItem("user_token", getState().auth.token)
      //localStorage.setItem("userData", JSON.stringify(getState().auth.token)))
    })
  }
}

export function logout(){
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_LOGOUT });
    localStorage.removeItem("user_token");
  }
  
}


export function loginWithToken(token) {
  return (dispatch, getState) => {
    dispatch({ type : ActionTypes.SET_USER_TOKEN, token })
    dispatch(meRequest())
  }
    
}