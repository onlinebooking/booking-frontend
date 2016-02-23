import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'


function shops(state={}, action){
    switch (action.type) {
        case ActionTypes.SHOPS_SUCCESS:
           return action.shops; 

        case ActionTypes.SHOP_SUCCESS:
           return Object.assign({}, state, { [action.shop.id] : action.shop });
    }

    return state;
}




function loading(state={ shops: false, shop:false }, action){
    switch (action.type) {
        case ActionTypes.SHOPS_REQUEST:
           return Object.assign({}, state, { shops : true }); 

        case ActionTypes.SHOP_REQUEST:
           return Object.assign({}, state, { shop : true }); 
        
        case ActionTypes.SHOPS_SUCCESS:
        case ActionTypes.SHOPS_FAILURE:
            return Object.assign({}, state, { shops : false }); 

        case ActionTypes.SHOP_FAILURE:
        case ActionTypes.SHOP_SUCCESS:
            return Object.assign({}, state, { shop : false }); 

    }

    return state;
}



const rootReducer = combineReducers({
  entities : combineReducers({ shops }),
  loading,
  routing
});

export default rootReducer;
