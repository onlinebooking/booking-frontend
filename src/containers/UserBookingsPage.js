import React from 'react';
import { connect } from 'react-redux';
import UserBookingsList from '../components/UserBookingsList';
import Spinner from '../components/Spinner';

class UserBookingsPage extends React.Component {

  render() {
    return (
      <div>
        {this.renderBookingList()}
      </div>
    );
  }

  renderBookingList() {
    const { isFetching, bookings } = this.props;

    if (isFetching && !bookings.length) {
      return <Spinner />;
    }
    return <UserBookingsList bookings={bookings} />;
  }
}

function mapStateToProps(state) {
  const bookings = state.userBookings.ids.map(id => state.entities.bookings[id]);
  const isFetching = state.userBookings.isFetching;
  return { bookings, isFetching };
}

export default connect(mapStateToProps)(UserBookingsPage);
