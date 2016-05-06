import { mapValues, assign } from 'lodash';
import { normalize } from 'normalizr';

// Two level deep shallow merge only
function mergeEntities(state, entities) {
  return _.mapValues(state, (v, k) => _.assign({}, v, entities[k]));
}

const initialState = {
  shops: {},
  services: {},
  bookings: {},
};

export default function entities(state = initialState, action) {
  // Normalize data and merge to entities
  if (action.entitySchema && action.data) {
    const { entities } = normalize(action.data, action.entitySchema);
    return mergeEntities(state, entities);
  }

  return state;
};
