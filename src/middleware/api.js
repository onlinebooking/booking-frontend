import { omit, pick } from 'lodash';
import { camelizeKeys } from 'humps';
import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://localhost:8000/api';

function callApi(endpoint, callConfig = {}) {

  // Hook for adding auth token, headers or other config common stuff
  const config = { ...callConfig };

  // Pick util response props
  const pickResponse = (r) => pick(r, ['status', 'statusText']);

  return fetch(BASE_URL + endpoint, config)
    .catch(message => {
      // Connection error, name resolving problem and other stuff like
      // Godzilla attack datacenters...
      // Simple wrap the message in a plain object for consistency
      return Promise.reject({ message });
    })
    .then(response =>
      response.json().then(
        json => ({ response, json: camelizeKeys(json) }),
        message => {
          // Error while parsing json
          return Promise.reject(({ ...pickResponse(response), message }));
        }
      )
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        // HTTP Error with json ok
        return Promise.reject({ ...pickResponse(response), data: json });
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

  //return new Promise((resolve, reject) => setTimeout(() => {

  return callApi(endpoint, config).then(
    data => next(actionWith({
      data,
      type: successType
    })),
    error => next(actionWith({
      error, // Object describe error
      type: failureType
    }))
  )//;
  //.then(resolve, reject)

  //}, 2000));
};
