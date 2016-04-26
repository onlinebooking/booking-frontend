import { keyBy } from 'lodash';

const initialState = {
  shops: {},
  services: {},
  bookings: {},
};

// Map data to entity object -> { id: item }
function mapToEntityObj(data) {
  const items = Array.isArray(data) ? data : [data];
  return keyBy(items, 'id');
}

export default function entities(state = initialState, action) {
  if (action.entity && action.data) {
    return {
      ...state,
      [action.entity]: Object.assign(
        {},
        state[action.entity],
        mapToEntityObj(action.data)
      )
    };
  }

  return state;
};
