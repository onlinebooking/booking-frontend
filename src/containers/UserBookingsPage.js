import React from 'react';
import { connect } from 'react-redux';
import { getUserBookings } from '../selectors/bookings';
import UserBookingsList from '../components/UserBookingsList';
import Spinner from '../components/Spinner';
import { loadUserBookings } from '../actions/user-bookings';

function loadData(props) {
  props.loadUserBookings();
}

class UserBookingsPage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

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
  const isFetching = state.userData.bookings.list.isFetching;
  return {
    bookings: getUserBookings(state),
    isFetching
  };
}

export default connect(mapStateToProps, {
  loadUserBookings,
})(UserBookingsPage);
