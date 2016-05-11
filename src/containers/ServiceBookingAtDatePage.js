import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import BookingRangeList from '../components/BookingRangeList';
import ErrorAlert from '../components/ErrorAlert';
import InvalidBookPeriod from '../components/InvalidBookPeriod';
import { push, replace } from 'react-router-redux';
import Spinner from '../components/Spinner';
import { loadBookingRanges, setBookingCalendarDate } from '../actions/booking';
import { showModalLogin } from '../actions/auth';

function loadData(props) {
  const { bookingDate, shopId, serviceId } = props.params;
  if (moment(bookingDate, 'YYYY-MM-DD', true).isValid()) {
    props.setBookingCalendarDate(bookingDate);
    props.loadBookingRanges({ loadSingleDay: true });
  } else {
    props.replace(`/shops/${shopId}/booking/${serviceId}`);
  }
}

class ServiceBookingAtDatePage extends React.Component {

  constructor(props) {
    super(props);

    this.onRangeBooked = this.onRangeBooked.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.shopId !== this.props.params.shopId ||
        nextProps.params.serviceId !== this.props.params.serviceId ||
        nextProps.params.bookingDate !== this.props.params.bookingDate) {
      loadData(nextProps);
    }
  }

  changeDateUrl() {
    const { bookingDate, shop, service } = this.props;
    return `/shops/${shop.id}/booking/${service.id}?date=${bookingDate}`;
  }

  onRangeBooked(range) {
    if (this.props.authenticated) {
      const { shop, service, push } = this.props;
      push(`/shops/${shop.id}/booking/${service.id}/book/${range.start}/${range.end}`);
    } else {
      this.props.showModalLogin();
    }
  }

  render() {
    const { error, loading, bookingRanges, bookingDate } = this.props; // wOw

    // First render error if necessary
    if (error) {
      return this.renderError();
    }

    // We can change this bheaviur...I personally believe in ranges
    // in current state but if you don't believe you can simply
    // remove the second && condition :)
    if (loading && !bookingRanges.length) {
      return <Spinner />;
    }

    // No loading, no ranges, this date is not good
    if (!loading && !bookingRanges.length) {
      return this.renderInvalidBookingDate();
    }

    // We can render the range list
    return this.renderRangeList();
  }

  renderRangeList() {
    const { bookingDate, bookingRanges, loading } = this.props;
    // Or this is also a very COOL bheaviur ;)
    const opacity = loading ? '0.5' : '1';

    return (
      <div style={{opacity}}>
        <BookingRangeList
          date={bookingDate}
          ranges={bookingRanges}
          showBookingButton={true}
          changeDateUrl={this.changeDateUrl()}
          onRangeBooked={this.onRangeBooked}
        />
      </div>
    );
  }

  renderInvalidBookingDate() {
    const { bookingDate } = this.props;

    return <InvalidBookPeriod
      date={bookingDate}
      isDateBookable={false}
      changeDateUrl={this.changeDateUrl()}
    />;
  }

  renderError() {
    const { error, bookingDate } = this.props;
    const formattedDate = moment(bookingDate, 'YYYY-MM-DD').format('dddd D MMMM YYYY');

    return (
      <ErrorAlert
        title={`Error nel recupero degli orari di ${formattedDate}.`}
        {...error}
      />
    );
  }
}

function mapStateToProps(state) {
  const { ranges } = state.booking;
  const authenticated = !!state.auth.user;
  const bookingRanges = ranges.items[state.booking.calendarDate] || [];

  return {
    authenticated,
    bookingRanges,
    bookingDate: state.booking.calendarDate,
    loading: ranges.isFetching,
    error: ranges.error,
  };
}

export default connect(mapStateToProps, {
  loadBookingRanges,
  setBookingCalendarDate,
  showModalLogin,
  push,
  replace,
})(ServiceBookingAtDatePage);
