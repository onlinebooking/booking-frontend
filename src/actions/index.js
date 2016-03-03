import fetch from 'isomorphic-fetch';

const API_URL = 'http://localhost:8000/api';

export const SHOPS_REQUEST = 'SHOPS_REQUEST';
export const SHOPS_SUCCESS = 'SHOPS_SUCCESS';
export const SHOPS_FAILURE = 'SHOPS_FAILURE';

export const SHOP_REQUEST = 'SHOP_REQUEST';
export const SHOP_SUCCESS = 'SHOP_SUCCESS';
export const SHOP_FAILURE = 'SHOP_FAILURE';

export const SHOP_SERVICES_REQUEST = 'SHOP_SERVICES_REQUEST';
export const SHOP_SERVICES_SUCCESS = 'SHOP_SERVICES_SUCCESS';
export const SHOP_SERVICES_FAILURE = 'SHOP_SERVICES_FAILURE';

export const SET_BOOKING_DATA = 'SET_BOOKING_DATA';

export const REQUEST_BOOKING_RANGES = 'REQUEST_BOOKING_RANGES';
export const RANGES_REQUEST = 'RANGES_REQUEST';
export const RANGES_SUCCESS = 'RANGES_SUCCESS';
export const RANGES_FAILURE = 'RANGES_FAILURE';

export const SET_BOOKING_RANGE = 'SET_BOOKING_RANGE';


import { keys, keyBy, isArray } from "lodash";


function randomShops(){
    const i = parseInt(Math.random() * 1000);
    return i % 2 == 0 ? [{name:"aaaa", id:1}, {name:"bbb", id:2}] : [{name:"ccc", id:3}, {name:"ddd", id:4}];
}



export function loadShops() {
    return apiEntity(
        'shops',
        fetch(`${API_URL}/shops`),
        [SHOPS_REQUEST, SHOPS_FAILURE, SHOPS_SUCCESS]
    );
}


export function loadShop(shopId) {
    //#TODO : CHECK IF NEEDED!
    return apiEntity(
        'shops',
        fetch(`${API_URL}/shops/${shopId}`),
        [SHOP_REQUEST, SHOP_FAILURE, SHOP_SUCCESS]
    );
}

export function loadShopServices(shopId) {
    //#TODO : CHECK IF NEEDED!
    return apiEntity(
        'services',
        fetch(`${API_URL}/shops/${shopId}/services`),
        [SHOP_SERVICES_REQUEST, SHOP_SERVICES_FAILURE, SHOP_SERVICES_SUCCESS],
        { shopId }
    );
}


export function apiEntity(entity, asyncOperation, types, data={}) {
  return (dispatch, getState) => {
    const [typeRequest, typeFailure, typeSuccess] = types;
    
    const requestAction = Object.assign({}, { type : typeRequest }, data);
    dispatch(requestAction);
    
    asyncOperation
    .then(function(response) {
        if (response.status >= 400) {
            //throw new Error("Bad response from server");
            const failureAction = Object.assign({}, { type : typeFailure }, data)
            dispatch(failureAction);
        }

        return response.json();
    })
    .then((items)=>{
        if (!isArray(items)) {
            items = [items];
        }
        
        const successAction = Object.assign({}, { type : typeSuccess, entity, items }, data);
        dispatch(successAction);
    })
  }
}


export function setBookingData(data){
    return {
        type : SET_BOOKING_DATA,
        ...data
    };
}


export function setCurrentBookingRange(idx){
    return {
        type : SET_BOOKING_RANGE,
        idx
    };
}

export function requestBookingRanges(){
    return (dispatch, getState) => {

        const { start, end, service } = getState().booking.data;

        dispatch({ type: RANGES_REQUEST });

        fetch(`${API_URL}/calculate-ranges?start=${start}&end=${end}&service=${service}`)
        .then(response => {
            if (response.status >= 400) {
                //throw new Error("Bad response from server");
                dispatch({ type: RANGES_FAILURE });
            }
            
            return response.json();
        })
        .then(ranges => {
            dispatch({ type: RANGES_SUCCESS, ranges });
        });

    }
    
}



