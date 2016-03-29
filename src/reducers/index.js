import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as ActionTypes from '../constants/ActionTypes';
import entities from './entities';
import simpleResList from './simple-res-list';
import booking from './booking';
import auth from './auth';
import pageError from './page-error';

const service = simpleResList([
  ActionTypes.SHOP_SERVICES_REQUEST,
  ActionTypes.SHOP_SERVICES_SUCCESS,
  ActionTypes.SHOP_SERVICES_FAILURE
]);

function shopServices(state = {}, action){
  switch(action.type) {

    case ActionTypes.SHOP_SERVICES_REQUEST:
    case ActionTypes.SHOP_SERVICES_FAILURE:
    case ActionTypes.SHOP_SERVICES_SUCCESS:
      return {
        ...state,
        [action.shopId] : service(state[action.shopId], action)
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  entities,
  homeShops: simpleResList([
    ActionTypes.SHOPS_REQUEST,
    ActionTypes.SHOPS_SUCCESS,
    ActionTypes.SHOPS_FAILURE
  ]),
  shopServices,
  routing,
  booking,
  auth,
  pageError,
});

export default rootReducer;
