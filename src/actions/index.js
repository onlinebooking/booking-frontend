export * from './shops';
export * from './booking';

//import { CALL_API } from '../middleware/api';
//import * as ActionTypes from '../constants/ActionTypes';


//function setAuthTokenConfig(state, config={headers : { }}){
  //const authtoken = state.auth ? "JWT " + state.auth.token : null;
  //return { ...config, headers : { ...config.headers, Authorization:authtoken }}
//}


//function jsonPostConfig(body){

  //return {
     //method: 'post',
     //headers: {
      //'Accept': 'application/json',
      //'Content-Type': 'application/json'
    //},
    //body: JSON.stringify(body)
  //}
//}


//function loginRequest({email, password}) {
  //return {
    //[CALL_API]: {
      //endpoint: `/auth/`,
      //config : jsonPostConfig({email, password}),
      //types: [
        //ActionTypes.USER_LOGIN_REQUEST,
        //ActionTypes.USER_LOGIN_SUCCESS,
        //ActionTypes.USER_LOGIN_FAILURE
      //]
    //}
  //};
//};


//function meRequest() {
  //return (dispatch, getState) => {
    //dispatch({
      //[CALL_API]: {
        //endpoint: `/me/`,
        //config : setAuthTokenConfig(getState()),
        //types: [
          //ActionTypes.ME_REQUEST,
          //ActionTypes.ME_SUCCESS,
          //ActionTypes.ME_FAILURE
        //]
      //}
    //})
  //}
//};



//export function login({email, password}) {
  //return (dispatch, getState) => {
    //dispatch(loginRequest({email, password}))
    //.then(()=>{
      //dispatch(meRequest())
    //})
    //.then(() => {
      //localStorage.setItem("user_token", getState().auth.token)
      ////localStorage.setItem("userData", JSON.stringify(getState().auth.token)))
    //})
  //}
//}

//export function logout(){
  //return (dispatch, getState) => {
    //dispatch({ type: ActionTypes.USER_LOGOUT });
    //localStorage.removeItem("user_token");
  //}
  
//}


//export function loginWithToken(token) {
  //return (dispatch, getState) => {
    //dispatch({ type : ActionTypes.SET_USER_TOKEN, token })
    //dispatch(meRequest())
  //}
    
//}
