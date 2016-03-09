function bookingData(state={start:null, end:null, service:null}, action){
  if(action.type === ActionTypes.SET_BOOKING_DATA) {
    return { ...state, ...pick(action, ['start', 'end', 'service']) };
  }

  return state;

}

function bookingRanges(state=[], action){
  if(action.type === ActionTypes.RANGES_SUCCESS) {
    return action.ranges ;
  }

  return state;

}


function selectedRange(state=null, action){
  if(action.type === ActionTypes.SET_BOOKING_RANGE) {
    return action.idx ;
  }

  return state;

}
