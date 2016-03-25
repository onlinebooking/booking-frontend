import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BookingRangeList from '../components/BookingRangeList';
import { hashHistory } from 'react-router';

class ServiceBookingAtDatePage extends React.Component {

  onRangeBooked(range) {
    alert(`Want to book ${range.start} - ${range.end}`);
  }

  onUndo() {
    // Not perfect fix this!
    const { shop, service } = this.props;
    const bookingDate = this.props.params.bookingDate;
    hashHistory.replace(`/shops/${shop.id}/booking/${service.id}?date=${bookingDate}`);
  }

  render() {
    return (
      <div className="booking-range-list-container">
        <BookingRangeList
          date={this.props.params.bookingDate}
          ranges={this.props.bookingRanges}
          showBookingButton={true}
          onRangeBooked={this.onRangeBooked.bind(this)}
          onUndo={this.onUndo.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { ranges } = state.booking;
  const bookingRanges = ranges.items[ownProps.params.bookingDate] || [];

  return {
    bookingRanges,
  };
}

export default connect(mapStateToProps)(ServiceBookingAtDatePage);
