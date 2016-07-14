import { map as pluck } from 'lodash';

const initialState = {
  isFetching: false,
  ids: [],
};

export default function simpleResList(types, idAttribute = 'id') {
  const [ requestType, successType, failureType ] = types;

  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return { ...state, isFetching: true };

      case failureType:
        return { ...state, isFetching: false };

      case successType:
        const ids = pluck(action.data, idAttribute);
        return { ...state, isFetching: false, ids };

      default:
        return state;
    }
  };
};
