import React from 'react';
import { includes } from 'lodash';
import { connect } from 'react-redux';
import { getUserBookingsViewed } from '../selectors/bookings';
import UserBookingsList from '../components/UserBookingsList';
import Spinner from '../components/Spinner';
import { replace } from 'react-router-redux';
import {
  loadIncomingUserBookings,
  setIncomingUserBookingsView
} from '../actions/user-bookings';
import {
  setPageError
} from '../actions/page-error';
import {
  INCOMING_USER_BOOKINGS_BY_SHOP,
  INCOMING_USER_BOOKINGS_LIST,
} from '../constants/ViewTypes';

function loadData(props) {
  props.loadIncomingUserBookings();
}

function setView(props) {
  const { view } = props.params;
  const allViewsTypes = [
    INCOMING_USER_BOOKINGS_BY_SHOP,
    INCOMING_USER_BOOKINGS_LIST,
  ];
  if (!view) {
    props.replace(`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_LIST}`);
  } else if (includes(allViewsTypes, view)) {
    props.setIncomingUserBookingsView(view);
  } else {
    // Got Not Found
    props.setPageError({ status: 404, statusText: 'Not Found' });
    //props.replace(`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_LIST}`);
  }
}

class UserBookingsPage extends React.Component {

  componentWillMount() {
    setView(this.props);
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.view !== this.props.params.view) {
      setView(nextProps);
    }
  }

  render() {
    return (
      <div>
        {this.renderBookingList()}
      </div>
    );
  }

  renderBookingList() {
    const { isFetching, bookings, view } = this.props;

    if (isFetching && !bookings.length) {
      return <Spinner />;
    }
    return <UserBookingsList bookings={bookings} view={view} />;
  }
}

function mapStateToProps(state) {
  const isFetching = state.userData.bookings.incoming.list.isFetching;
  const view = state.userData.bookings.incoming.view;
  return {
    bookings: getUserBookingsViewed(state),
    view,
    isFetching,
  };
}

export default connect(mapStateToProps, {
  loadIncomingUserBookings,
  setIncomingUserBookingsView,
  setPageError,
  replace,
})(UserBookingsPage);
