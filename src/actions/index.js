import fetch from 'isomorphic-fetch';

const API_URL = 'http://localhost:8000/api';

export const SHOPS_REQUEST = 'SHOPS_REQUEST';
export const SHOPS_SUCCESS = 'SHOPS_SUCCESS';
export const SHOPS_FAILURE = 'SHOPS_FAILURE';

export const SHOP_REQUEST = 'SHOP_REQUEST';
export const SHOP_SUCCESS = 'SHOP_SUCCESS';
export const SHOP_FAILURE = 'SHOP_FAILURE';

import { keys, keyBy } from "lodash";


function randomShops(){
    const i = parseInt(Math.random() * 1000);
    return i % 2 == 0 ? [{name:"aaaa", id:1}, {name:"bbb", id:2}] : [{name:"ccc", id:3}, {name:"ddd", id:4}];
}

export function loadShops() {
  return (dispatch, getState) => {

    dispatch({
        type : SHOPS_REQUEST
    });
    
    fetch(`${API_URL}/shops`)
    .then(function(response) {
        if (response.status >= 400) {
            //throw new Error("Bad response from server");
            dispatch({
                type : SHOPS_FAILURE
            })

        }

        return response.json();
    })
    .then((shops)=>{
        dispatch({
            type : SHOPS_SUCCESS,
            shops : keyBy(shops, 'id')
        })
    })
  }
}


export function loadShop(shopId) {
  return (dispatch, getState) => {

    dispatch({
        type : SHOP_REQUEST
    });


    const currentState = getState();
    if ( currentState.entities.shops[shopId] ){
        console.log("from cache")
        dispatch({
            type : SHOP_SUCCESS,
            shop : currentState.entities.shops[shopId]
        })

        return
    }

    
    fetch(`${API_URL}/shops/${shopId}`)
    .then(function(response) {
        if (response.status >= 400) {
            //throw new Error("Bad response from server");
            dispatch({
                type : SHOP_FAILURE
            })

        }

        return response.json();
    })
    .then((shop)=>{
        dispatch({
            type : SHOP_SUCCESS,
            shop : shop
        })
    })
  }
}
