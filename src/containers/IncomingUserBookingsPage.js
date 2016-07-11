import React from 'react';
import { includes } from 'lodash';
import { connect } from 'react-redux';
import IncomingUserBookings from '../components/IncomingUserBookings';
import Spinner from '../components/Spinner';
import { replace } from 'react-router-redux';
import { getBookingsStatusesList } from '../utils/booking';
import {
  getIncomingUserBookingsFilteredAndViewed,
  getIncomingUserBookingsTotalCount,
  getIncomingUserBookingsCountFiltered
} from '../selectors/bookings';
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

class IncomingUserBookingsPage extends React.Component {

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
    const {
      loading,
      bookings,
      view,
      searchText,
      statusFilter,
      bookingsCount,
      bookingsCountFiltered
    } = this.props;

    if (loading && !bookings.length) {
      return <Spinner fullpage />;
    }

    return (
      <div className="container-fluid margin-top-20">
        <IncomingUserBookings
          bookings={bookings}
          bookingsCount={bookingsCount}
          bookingsCountFiltered={bookingsCountFiltered}
          loading={loading}
          statusFilter={statusFilter}
          view={view}
          searchText={searchText}
          onSearchTextChanged={this.onSearchTextChanged}
          onStatusFilterChanged={this.onStatusFilterChanged}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loading = state.userData.bookings.incoming.list.isFetching;
  const view = state.userData.bookings.incoming.view;
  const searchText = state.userData.bookings.incoming.filters.search;
  const statusFilter = state.userData.bookings.incoming.filters.status;
  return {
    bookings: getIncomingUserBookingsFilteredAndViewed(state),
    bookingsCount: getIncomingUserBookingsTotalCount(state),
    bookingsCountFiltered: getIncomingUserBookingsCountFiltered(state),
    view,
    statusFilter,
    searchText,
    loading,
  };
}

export default connect(mapStateToProps, {
  loadIncomingUserBookings,
  setIncomingUserBookingsView,
  setIncomingUserBookingsStatusFilter,
  setIncomingUserBookingsSearchFilter,
  setPageError,
  replace,
})(IncomingUserBookingsPage);
