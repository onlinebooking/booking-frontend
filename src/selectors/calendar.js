import { createSelector } from 'reselect';
import { keys } from 'lodash';
import moment from 'moment';

function mapDatesToCalendarEvents(availableDates){
  return availableDates.map(date => {
    return {
      title: 'Prenota',
      date: moment(date, 'YYYY-MM-DD'),
      allDay: true,
      className: 'booking-event',
    };
  });
}

const getAvailablesBookingRanges = (state) => state.booking.ranges.items;

// Map bookings range to fullcalendar valid events
export const getBookingAvailblesCalendarDates = createSelector(
  [ getAvailablesBookingRanges ],
  ranges => mapDatesToCalendarEvents(keys(ranges))
);
