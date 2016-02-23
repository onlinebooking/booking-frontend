import fetch from 'isomorphic-fetch';

const API_URL = 'http://localhost:8000/api';

export const SHOPS_REQUEST = 'SHOPS_REQUEST';
export const SHOPS_SUCCESS = 'SHOPS_SUCCESS';
export const SHOPS_FAILURE = 'SHOPS_FAILURE';

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

    /*
    dispatch({
        type : SHOPS_SUCCESS, shops: randomShops()
    });

    return
    */
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
