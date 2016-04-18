import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import BookingCalendar from '../components/BookingCalendar';
import { keys } from 'lodash';
import { push } from 'react-router-redux';
import {
  loadBookingRanges,
  setBookingCalendarDate
} from '../actions/booking';

// TODO: Re-selectize!
function createCalendarEvents(availableDates){
  return availableDates.map(date => {
    return {
      title: 'Book Me!',
      date: moment(date, 'YYYY-MM-DD'),
      allDay: true,
      className: 'booking-event',
    };
  });
}

class ServiceBookingCaledarPage extends React.Component {

  onCalendarChange(calendarDate) {
    const date = calendarDate.format('YYYY-MM-DD');
    if (date != this.props.calendarDate) {
      // Set in store and update location
      this.props.setBookingCalendarDate(date, true);
      this.props.loadBookingRanges();
    }
  }

  onEventClick(event) {
    // Go to booking date page
    const { shop, service, push } = this.props;
    const bookingDate = event.date.format('YYYY-MM-DD');
    push(`shops/${shop.id}/booking/${service.id}/at/${bookingDate}`);
  }

  render() {
    return (
      <div className="booking-calendar-container">
        <BookingCalendar
          events={createCalendarEvents(this.props.availableDates)}
          calendarDate={this.props.calendarDate}
          onEventClick={this.onEventClick.bind(this)}
          onCalendarChange={this.onCalendarChange.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { calendarDate, ranges } = state.booking;

  return {
    calendarDate,
    availableDates: keys(ranges.items),
  };
}

export default connect(mapStateToProps, {
  setBookingCalendarDate,
  loadBookingRanges,
  push,
})(ServiceBookingCaledarPage);
