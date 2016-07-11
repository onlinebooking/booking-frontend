import React from 'react';
import ErrorAlert from '../components/ErrorAlert';
import InvalidBookPeriod from '../components/InvalidBookPeriod';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import BookingSteps from '../components/BookingSteps';
import BookingRange from '../components/BookingRange';
import { getBookedRange } from '../selectors/bookings';
import { find, isEqual, isArray } from 'lodash';
import moment from 'moment';
import { replace } from 'react-router-redux';
import {
  book,
  setBookingCalendarDate,
  setBookingRange,
  loadBookingRanges
} from '../actions/booking';

function loadData(props) {
  const { rangeStart, rangeEnd, shopId, serviceId } = props.params;
  const start = moment(rangeStart, moment.ISO_8601, true);
  const end = moment(rangeEnd, moment.ISO_8601, true);

  if (start.isValid() && end.isValid()) {
    props.setBookingCalendarDate(start.format('YYYY-MM-DD'));
    props.setBookingRange({ start: rangeStart, end: rangeEnd });
    props.loadBookingRanges({ loadSingleDay: true });
  } else {
    props.replace(`/shops/${shopId}/booking/${serviceId}`);
  }
}

class ServiceBookingRangePage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.shopId !== this.props.params.shopId ||
        nextProps.params.serviceId !== this.props.params.serviceId ||
        nextProps.params.rangeStart !== this.props.params.rangeStart ||
        nextProps.params.rangeEnd !== this.props.params.rangeEnd) {
      loadData(nextProps);
    }
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
    const { range, requestedRange, fetchingRangeError, isFetchingRange } = this.props;

    // Not yet a requested range
    if (!requestedRange) {
      return <Spinner fullpage><div>Carico la disponibilità richiesta</div></Spinner>;
    }

    // Error while fetching range
    if (fetchingRangeError) {
      return this.renderFetchingRangeError();
    }

    // Loading for range, no data to show yet so show a spinner!
    if (isFetchingRange && !range) {
      return <Spinner fullpage><div>Carico la disponibilità richiesta</div></Spinner>;
    }

    // No loading no range, invalid range!
    if (!isFetchingRange && !range) {
      return this.renderInvalidRange();
    }

    // Ok, we have a valid range to book!
    return this.renderBookingRange();
  }

  renderBookingRange() {
    const {
      range,
      isFetchingRange,
      isSavingBook,
      bookingDate,
      bookedRange,
      savingBookError,
      book,
      user,
      service,
    } = this.props;
    const {schema, uiSchema } = service['booking_options_schema'];
    const opacity = isFetchingRange ? '0.5' : '1';

    return (
      <div className="container-fluid">
      <BookingSteps step={3} />
      <div style={{opacity}}>
        <BookingRange
          range={range}
          schema={schema||{}}
          uiSchema={uiSchema||{}}
          date={bookingDate}
          loading={isSavingBook}
          error={savingBookError}
          bookedRange={bookedRange}
          onConfirmBooking={book}
          changeDateUrl={this.changeDateUrl()}
          changeRangeUrl={this.changeRangeUrl()}
          user={user}
        />
      </div>
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

  const user = state.auth.user;

  return {
    range,
    requestedRange,
    bookingDate,
    isDateBookable,
    isFetchingRange: state.booking.ranges.isFetching,
    fetchingRangeError: state.booking.ranges.error,
    isSavingBook: state.booking.book.isSaving,
    savingBookError: state.booking.book.error,
    bookedRange: getBookedRange(state),
    user,
  };
}

export default connect(mapStateToProps, {
  replace,
  setBookingCalendarDate,
  setBookingRange,
  loadBookingRanges,
  book,
}, undefined, { pure: false })(ServiceBookingRangePage);
