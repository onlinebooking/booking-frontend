import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import BookingCalendar from '../components/BookingCalendar';
import ErrorAlert from '../components/ErrorAlert';
import { getBookingAvailblesCalendarDates } from '../selectors/calendar';
import { push } from 'react-router-redux';
import { loadBookingRanges, setBookingCalendarDate } from '../actions/booking';

function loadData(props) {
  const { shopId, serviceId } = props.params;
  const calendarDate = moment(props.location.query.date, 'YYYY-MM-DD', true);
  if (calendarDate.isValid()) {
    props.setBookingCalendarDate(calendarDate.format('YYYY-MM-DD'));
  }
  props.loadBookingRanges();
}

class ServiceBookingCaledarPage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.shopId !== this.props.params.shopId ||
        nextProps.params.serviceId !== this.props.params.serviceId ||
        nextProps.location.query.date !== this.props.location.query.date) {
      loadData(nextProps);
    }
  }

  constructor(props) {
    super(props);

    this.onEventClick = this.onEventClick.bind(this);
    this.onCalendarChange = this.onCalendarChange.bind(this);
  }

  onCalendarChange(calendarDate) {
    const date = calendarDate.format('YYYY-MM-DD');
    if (date != this.props.calendarDate) {
      // Set in store and update location
      this.props.setBookingCalendarDate(date, true);
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
        {this.renderError()}
        {this.renderLoading()}
        <BookingCalendar
          events={this.props.availableDates}
          calendarDate={this.props.calendarDate}
          onEventClick={this.onEventClick}
          onCalendarChange={this.onCalendarChange} />
      </div>
    );
  }

  renderLoading() {
    const visibility = this.props.loading ? 'visible' : 'hidden';
    return <div className="booking-calendar-loader" style={{visibility}}>Loading...</div>;
  }

  renderError() {
    const { error } = this.props;

    if (error) {
      return <ErrorAlert
        title={"Errore nel recupero dei giorni disponibili, riprova più tardi."}
        {...error}
      />;
    }
  }
}

function mapStateToProps(state) {
  const { calendarDate, ranges } = state.booking;

  return {
    calendarDate,
    loading: ranges.isFetching,
    error: ranges.error,
    availableDates: getBookingAvailblesCalendarDates(state),
  };
}

export default connect(mapStateToProps, {
  setBookingCalendarDate,
  loadBookingRanges,
  push,
})(ServiceBookingCaledarPage);
