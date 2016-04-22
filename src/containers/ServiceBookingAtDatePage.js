import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BookingRangeList from '../components/BookingRangeList';
import ErrorAlert from '../components/ErrorAlert';
import InvalidBookPeriod from '../components/InvalidBookPeriod';
import { push } from 'react-router-redux';
import Spinner from '../components/Spinner';
import moment from 'moment';

class ServiceBookingAtDatePage extends React.Component {

  constructor(props) {
    super(props);

    this.onRangeBooked = this.onRangeBooked.bind(this);
  }

  changeDateUrl() {
    const { bookingDate, shop, service } = this.props;
    return `/shops/${shop.id}/booking/${service.id}?date=${bookingDate}`;
  }

  onRangeBooked(range) {
    const { shop, service, push } = this.props;
    push(`/shops/${shop.id}/booking/${service.id}/book/${range.start}/${range.end}`);
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

    // No loading, lo ranges, this date is not good
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
  const bookingRanges = ranges.items[state.booking.calendarDate] || [];

  return {
    bookingRanges,
    bookingDate: state.booking.calendarDate,
    loading: ranges.isFetching,
    error: ranges.error,
  };
}

export default connect(mapStateToProps, {
  push,
})(ServiceBookingAtDatePage);
