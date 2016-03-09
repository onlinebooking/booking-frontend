import { omit } from 'lodash';
import { camelizeKeys } from 'humps';
import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://localhost:8000/api';

function callApi(endpoint, callConfig = {}) {

  // Hook for adding auth token, headers or other config common stuff
  const config = { ...callConfig };

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.json().then(json => ({ response, json: camelizeKeys(json) }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {

  const callAPI = action[CALL_API];

  // Not an api action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, endpoint, config = {} } = callAPI;
  const [ requestType, successType, failureType ] = types;

  const actionWith = data => Object.assign({}, omit(action, [CALL_API]), data);

  next(actionWith({ type: requestType }));

  setTimeout(() => {

  return callApi(endpoint, config).then(
    data => next(actionWith({
      data,
      type: successType
    })),
    error => next(actionWith({
      error, // Not sure of what error is
      type: failureType
    }))
  );

  }, 2000);

};
