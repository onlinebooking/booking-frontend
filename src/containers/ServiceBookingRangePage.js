import React from 'react';
import { Link } from 'react-router';
import ErrorAlert from '../components/ErrorAlert';
import InvalidBookPeriod from '../components/InvalidBookPeriod';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import BookingRange from '../components/BookingRange';
import { find, isEqual, isArray } from 'lodash';
import moment from 'moment';

class ServiceBookingRangePage extends React.Component {

  constructor(props) {
    super(props);
  }

  changeDateUrl() {
    const { bookingDate, shop, service } = this.props;
    return `/shops/${shop.id}/booking/${service.id}?date=${bookingDate}`;
  }

  changeRangeUrl() {
    const { bookingDate, shop, service } = this.props;
    return `/shops/${shop.id}/booking/${service.id}/at/${bookingDate}`;
  }

  render() {
    const { range, fetchingRangeError, isFetchingRange } = this.props;

    // Error while fetching range
    if (fetchingRangeError) {
      return this.renderFetchingRangeError();
    }

    // Loading for range, no data to show yet so show a spinner!
    if (isFetchingRange && !range) {
      return <Spinner />;
    }

    // No loading no range, invalid range!
    if (!isFetchingRange && !range) {
      return this.renderInvalidRange();
    }

    // Ok, we have a valid range to book!
    return this.renderBookingRange();
  }

  renderBookingRange() {
    const { range, isFetchingRange, bookingDate } = this.props;
    const opacity = isFetchingRange ? '0.5' : '1';

    return (
      <div style={{opacity}}>
        <BookingRange
          range={range}
          date={bookingDate}
          changeDateUrl={this.changeDateUrl()}
          changeRangeUrl={this.changeRangeUrl()}
        />
      </div>
    );
  }

  renderFetchingRangeError() {
    const { fetchingRangeError } = this.props;

    return (
      <ErrorAlert
        title={'Errore nel recupero della disponibilità richiesta.'}
        {...fetchingRangeError}
      />
    );
  }

  renderInvalidRange() {
    const { isDateBookable, bookingDate, requestedRange } = this.props;

    return <InvalidBookPeriod
      date={bookingDate}
      range={requestedRange}
      isDateBookable={isDateBookable}
      changeDateUrl={this.changeDateUrl()}
      changeRangeUrl={this.changeRangeUrl()}
    />;
  }
}

function mapStateToProps(state) {
  const bookingDate = state.booking.calendarDate;
  const requestedRange = state.booking.book.range;
  const rangeItems = state.booking.ranges.items;
  // Check if day of requested range is bookable
  const isDateBookable = isArray(rangeItems[bookingDate]);
  // Search for requested range in ranges of his day
  const range = isDateBookable
    ? find(rangeItems[bookingDate], range => isEqual(range, requestedRange))
    : null;

  return {
    range,
    requestedRange,
    bookingDate,
    isDateBookable,
    isFetchingRange: state.booking.ranges.isFetching,
    fetchingRangeError: state.booking.ranges.error,
    isSavingBook: state.booking.book.isSaving,
    savingBookError: state.booking.book.error,
    bookedRange: state.booking.book.bookedRange,
  };
}

export default connect(mapStateToProps, {
  //replace,
  //push,
})(ServiceBookingRangePage);
