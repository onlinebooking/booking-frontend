import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Alert } from 'react-bootstrap';
import BookingRangeList from '../components/BookingRangeList';
import { replace, push } from 'react-router-redux';
import Spinner from '../components/Spinner';

class ServiceBookingAtDatePage extends React.Component {

  constructor(props) {
    super(props);

    this.onUndo = this.onUndo.bind(this);
    this.onRangeBooked = this.onRangeBooked.bind(this);
  }

  onRangeBooked(range) {
    const { shop, service, push } = this.props;
    push(`/shops/${shop.id}/booking/${service.id}/book/${range.start}/${range.end}`);
  }

  onUndo() {
    const { shop, service, replace, bookingDate } = this.props;
    replace(`/shops/${shop.id}/booking/${service.id}?date=${bookingDate}`);
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

    // Or this is also a very COOL bheaviur ;)
    const opacity = loading ? '0.5' : '1';

    return (
      <div style={{opacity}} className="booking-range-list-container">
        <BookingRangeList
          date={bookingDate}
          ranges={bookingRanges}
          showBookingButton={true}
          onRangeBooked={this.onRangeBooked}
          onUndo={this.onUndo}
        />
      </div>
    );
  }

  renderInvalidBookingDate() {
    return (
      <div className="booking-range-list-container">
        <div>
          <p>No Ranges In This Date Bro!</p>
          <button className="btn btn-primary" onClick={this.onUndo}>Change Date</button>
        </div>
      </div>
    );
  }

  renderError() {
    // TODO: Maybe move error into separated component
    const { status, statusText } = this.props.error;
    return (
      <div className="booking-range-list-container">
        <Alert bsStyle="danger">
          <h4>Error Getting Ranges!</h4>
          <p>{status} {statusText}</p>
        </Alert>
      </div>
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
  replace,
  push,
})(ServiceBookingAtDatePage);
