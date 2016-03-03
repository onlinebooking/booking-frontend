import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import { keys, keyBy,  map as pluck } from "lodash";


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



const rootReducer = combineReducers({
  entities,
  homeShopList,
  routing
});

export default rootReducer;
