import React from 'react';
import { Link } from 'react-router';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import BookingRange from '../components/BookingRange';
import { find, isEqual, isArray } from 'lodash';
import moment from 'moment';

class ServiceBookingRangePage extends React.Component {

  constructor(props) {
    super(props);
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

    return <BookingRange
      range={range}
      date={bookingDate}
    />;
  }

  renderFetchingRangeError() {
    // TODO: Maybe move error into separated component
    const { status, statusText } = this.props.fetchingRangeError;
    <div className="booking-range-list-container">
      <Alert bsStyle="danger">
        <h4>Error Getting Ranges!</h4>
        <p>{status} {statusText}</p>
      </Alert>
    </div>
  }

  renderInvalidRange() {
    const { isDateBookable, bookingDate, shop, service } = this.props;
    const baseBookingUrl = `/shops/${shop.id}/booking/${service.id}`;

    if (isDateBookable) {
      // Invalid range but valid date, user can change ranges in date
      const toBookingAtPageUrl = `${baseBookingUrl}/at/${bookingDate}`;
      return (
        <div className="booking-range-container">
          <div>Orario invalido o non più disponibile</div>
          <Link to={toBookingAtPageUrl}>Cambia orario</Link>
        </div>
      );
    } else {
      // Invalid range and date, user must change date
      const toBookingCalendarPageUrl = `${baseBookingUrl}?date=${bookingDate}`;
      return (
        <div className="booking-range-container">
          <div>Giorno non disponibile</div>
          <Link to={toBookingCalendarPageUrl}>Cambia giorno</Link>
        </div>
      );
    }
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
