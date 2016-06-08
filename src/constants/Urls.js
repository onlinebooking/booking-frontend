
export const BOOKING_FRONTED_URL = (() => {
  if (process.env.NODE_ENV === 'production') {
    return 'http://booking.qando.it';
  } else {
    return 'http://localhost:3000';
  }
})();
