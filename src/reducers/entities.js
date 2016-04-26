import { merge } from 'lodash';
import { normalize } from 'normalizr';

const initialState = {
  shops: {},
  services: {},
  bookings: {},
};

export default function entities(state = initialState, action) {
  // Normalize data and merge to entities
  if (action.entitySchema && action.data) {
    const { entities } = normalize(action.data, action.entitySchema);
    return merge({}, state, entities);
  }

  return state;
};
