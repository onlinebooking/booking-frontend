import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import entities from './entities';
import simpleResList from './utils/simple-res-list';
import booking from './booking';
import userData from './user';
import auth from './auth';
import registration from './registration';
import pageError from './page-error';
import options from './options';
import {
  SHOPS_REQUEST,
  SHOPS_SUCCESS,
  SHOPS_FAILURE,
  SHOP_SERVICES_REQUEST,
  SHOP_SERVICES_SUCCESS,
  SHOP_SERVICES_FAILURE
} from '../constants/ActionTypes';

const homeShops = simpleResList([
  SHOPS_REQUEST,
  SHOPS_SUCCESS,
  SHOPS_FAILURE
]);

const service = simpleResList([
  SHOP_SERVICES_REQUEST,
  SHOP_SERVICES_SUCCESS,
  SHOP_SERVICES_FAILURE
]);

function shopServices(state = {}, action){
  switch(action.type) {

    case SHOP_SERVICES_REQUEST:
    case SHOP_SERVICES_FAILURE:
    case SHOP_SERVICES_SUCCESS:
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
  homeShops,
  shopServices,
  booking,
  auth,
  registration,
  userData,
  pageError,
  options,
  routing,
  form: formReducer,
});

export default rootReducer;
