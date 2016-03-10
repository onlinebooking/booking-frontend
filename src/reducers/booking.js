import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';
import { pick } from 'lodash';

function data(state={start:null, end:null, service:null}, action){
  if(action.type === ActionTypes.SET_BOOKING_DATA) {
    return { ...state, ...pick(action, ['start', 'end', 'service']) };
  }

  return state;

}

function bookingRanges(state={items:[], requestedAt:null}, action){
  if(action.type === ActionTypes.RANGES_SUCCESS) {
    if (!state.requestedAt || action.requestedAt > state.requestedAt) {
      return {...state, items:action.data, requestedAt:action.requestedAt }
    }
  }

  return state;

}


function selectedRange(state=null, action){
  if(action.type === ActionTypes.SET_BOOKING_RANGE) {
    return action.idx ;
  }

  return state;

}

export default combineReducers({ data, ranges:bookingRanges, selectedRange});