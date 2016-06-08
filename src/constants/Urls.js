export const BOOKING_FRONTED_URL = process.env.NODE_ENV === 'production'
  ? 'http://booking.qando.it'
  : 'http://localhost:3000';

export const BOOKING_API_URL = process.env.NODE_ENV === 'production'
  ? 'http://api.qando.it/api'
  : 'http://localhost:8000/api';
