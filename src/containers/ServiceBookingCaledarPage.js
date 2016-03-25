import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import BookingCalendar from '../components/BookingCalendar';
import { keys } from 'lodash';
import { hashHistory } from 'react-router';
import {
  loadBookingRanges,
  setBookingCalendarDate
} from '../actions';

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
      this.props.setBookingCalendarDate(date);
      this.props.loadBookingRanges();
      // Update date in query string
      const pathname = this.props.location.pathname;
      hashHistory.replace({
        pathname,
        query: { date }
      });
    }
  }

  onEventClick(event) {
    // Go to booking date page
    const pathname = this.props.location.pathname;
    const bookingDate = event.date.format('YYYY-MM-DD');
    hashHistory.push(`${pathname}/at/${bookingDate}`);
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
})(ServiceBookingCaledarPage);
