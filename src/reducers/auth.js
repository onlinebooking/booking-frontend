import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';



export default function auth(state={}, { type, data, error, token }) {
  if(type === ActionTypes.USER_LOGIN_REQUEST) {
    return { ...state, loading:true }
  }

  if(type === ActionTypes.USER_LOGIN_FAILURE || type === ActionTypes.ME_FAILURE) {
    return { ...state, loading:false, error }
  }

  if(type === ActionTypes.USER_LOGIN_SUCCESS) {
    return { ...state, token:data.token, error:null }
  }

  if(type === ActionTypes.ME_REQUEST) {
    return { ...state, loading:true }
  }
  
  if(type === ActionTypes.ME_SUCCESS) {
    return { ...state,  user : data, loading:false, error:null }
  }

  if(type === ActionTypes.USER_LOGOUT) {
    return {}
  }

  if (type === ActionTypes.SET_USER_TOKEN) {
    return { ...state, token }
  }

  return state;

}