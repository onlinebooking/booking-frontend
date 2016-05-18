import React from 'react';
import { includes } from 'lodash';
import { connect } from 'react-redux';
import { getUserBookingsFilteredAndViewed } from '../selectors/bookings';
import UserBookingsList from '../components/UserBookingsList';
import Spinner from '../components/Spinner';
import { replace } from 'react-router-redux';
import { getBookingsStatusesList } from '../utils/booking';
import {
  loadIncomingUserBookings,
  setIncomingUserBookingsView,
  setIncomingUserBookingsStatusFilter,
  setIncomingUserBookingsSearchFilter
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
  }
}

function setFilters(props) {
  const { search, status } = props.location.query;
  props.setIncomingUserBookingsSearchFilter(search || '');
  if (!status) {
    props.setIncomingUserBookingsStatusFilter(null);
  } else if (includes(getBookingsStatusesList(), status)) {
    props.setIncomingUserBookingsStatusFilter(status);
  } else {
    props.setIncomingUserBookingsStatusFilter(null, true);
  }
}

class UserBookingsPage extends React.Component {

  constructor(props) {
    super(props);

    this.onStatusFilterChanged = this.onStatusFilterChanged.bind(this);
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
  }

  componentWillMount() {
    setView(this.props);
    setFilters(this.props);
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.view !== this.props.params.view) {
      setView(nextProps);
    }
    if (nextProps.location.query.search !== this.props.location.query.search ||
        nextProps.location.query.status !== this.props.location.query.status) {
      setFilters(nextProps);
    }
  }

  onStatusFilterChanged(status) {
    this.props.setIncomingUserBookingsStatusFilter(status, true);
  }

  onSearchTextChanged(search) {
    this.props.setIncomingUserBookingsSearchFilter(search, true);
  }

  render() {
    return (
      <div>
        {this.renderBookingList()}
      </div>
    );
  }

  renderBookingList() {
    const { isFetching, bookings, view, searchText, statusFilter } = this.props;

    if (isFetching && !bookings.length) {
      return <Spinner />;
    }

    return <UserBookingsList
      bookings={bookings}
      statusFilter={statusFilter}
      view={view}
      searchText={searchText}
      onSearchTextChanged={this.onSearchTextChanged}
      onStatusFilterChanged={this.onStatusFilterChanged}
    />;
  }
}

function mapStateToProps(state) {
  const isFetching = state.userData.bookings.incoming.list.isFetching;
  const view = state.userData.bookings.incoming.view;
  const searchText = state.userData.bookings.incoming.filters.search;
  const statusFilter = state.userData.bookings.incoming.filters.status;
  return {
    bookings: getUserBookingsFilteredAndViewed(state),
    view,
    statusFilter,
    searchText,
    isFetching,
  };
}

export default connect(mapStateToProps, {
  loadIncomingUserBookings,
  setIncomingUserBookingsView,
  setIncomingUserBookingsStatusFilter,
  setIncomingUserBookingsSearchFilter,
  setPageError,
  replace,
})(UserBookingsPage);
