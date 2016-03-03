import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import { keys, keyBy,  map as pluck, pick } from "lodash";


function shops(state={}, action){
    /*
    switch (action.type) {
        case ActionTypes.SHOPS_SUCCESS:
           return action.shops; 

        case ActionTypes.SHOP_SUCCESS:
           return Object.assign({}, state, { [action.shop.id] : action.shop });
    }
    */
    return state;
}


const defaultEntities = { shops:{}, services:{} }

function entities(state=defaultEntities, action){
  
  if (action.entity) {
    const newItems = Object.assign({}, state[action.entity], keyBy(action.items, 'id'));
    return Object.assign({}, state, { [action.entity] : newItems }); 
  }

  return state;

}

const defaultHomeShopList = { fetching : false, items:[] }

function homeShopList(state=defaultHomeShopList, action){
  switch(action.type) {

    case ActionTypes.SHOPS_REQUEST:
      return Object.assign({}, state, { fetching: true }); 

    case ActionTypes.SHOPS_FAILURE:
      return Object.assign({}, state, { fetching: false }); 

    case ActionTypes.SHOPS_SUCCESS:
      return Object.assign({}, state, { fetching: false, items : pluck(action.items, 'id') }); 

  }

  return state;
}


const defaultShopServices = { };

function service(state={items:[], fetching:false}, action){
  switch(action.type) {

    case ActionTypes.SHOP_SERVICES_REQUEST:
      return { ...state,  fetching: true }; 

    case ActionTypes.SHOP_SERVICES_FAILURE:
      return { ...state,  fetching: false }; 

    case ActionTypes.SHOP_SERVICES_SUCCESS:
      return { ...state, items: pluck(action.items, 'id'), fetching: false }; 
  }

  return state;
}

function shopServices(state=defaultShopServices, action){
  switch(action.type) {

    case ActionTypes.SHOP_SERVICES_REQUEST:
    case ActionTypes.SHOP_SERVICES_FAILURE:
    case ActionTypes.SHOP_SERVICES_SUCCESS:
      return { ...state, [action.shopId] : service(state[action.shopId], action)}
  }

  return state;


}

function bookingData(state={start:null, end:null, service:null}, action){
  if(action.type === ActionTypes.SET_BOOKING_DATA) {
    return { ...state, ...pick(action, ['start', 'end', 'service']) };
  }

  return state;

}

function bookingRanges(state=[], action){
  if(action.type === ActionTypes.RANGES_SUCCESS) {
    return action.ranges ;
  }

  return state;

}


function selectedRange(state=null, action){
  if(action.type === ActionTypes.SET_BOOKING_RANGE) {
    return action.idx ;
  }

  return state;

}



const rootReducer = combineReducers({
  entities,
  homeShopList,
  shopServices,
  booking : combineReducers({
    data : bookingData,
    ranges : bookingRanges,
    selectedRange
  }),
  routing
});

export default rootReducer;
