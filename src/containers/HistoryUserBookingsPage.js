import React from 'react';
import HistoryUserBookings from '../components/HistoryUserBookings';
import { connect } from 'react-redux';
import { toInteger, debounce } from 'lodash';
import {
  loadHistoryUserBookings,
  setHistoryUserBookingsPage,
  setHistoryUserBookingsSearchFilter,
} from '../actions/user-bookings';
import {
  getHistoryUserBookings,
  getHistoryUserBookingsPagination
} from '../selectors/bookings';

function setFilters(props) {
  const { search, status } = props.location.query;
  props.setHistoryUserBookingsSearchFilter(search || '');
}

function setPage(props) {
  const page = toInteger(props.location.query.page);
  // When 0 page go to the first and set location
  props.setHistoryUserBookingsPage(page > 0 ? page : 1, true);
}

function loadData(props) {
  props.loadHistoryUserBookings();
}

class HistoryUserBookingsPage extends React.Component {

  constructor(props) {
    super(props);

    this.onSetPage = this.onSetPage.bind(this);
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    // Debounced version of loadHistoryUserBookings
    this.loadHistoryUserBookingsDebounced = debounce(this.props.loadHistoryUserBookings, 100);
  }

  componentWillMount() {
    setFilters(this.props);
    setPage(this.props);
    loadData(this.props);
  }

  onSetPage(page) {
    if (this.props.pagination.currentPage !== page) {
      this.props.setHistoryUserBookingsPage(page, true);
      this.props.loadHistoryUserBookings();
    }
  }

  onSearchTextChanged(search) {
    this.props.setHistoryUserBookingsSearchFilter(search, true);
    this.loadHistoryUserBookingsDebounced();
  }

  render() {
    const {
      bookings,
      pagination,
      search
    } = this.props;

    return (
      <div className="container-fluid margin-top-20">
      <HistoryUserBookings
        bookings={bookings}
        pagination={pagination}
        searchText={search}
        onSearchTextChanged={this.onSearchTextChanged}
        onSetPage={this.onSetPage}
      />
    </div>)
  }
}

function mapStateToProps(state) {
  const filters = state.userData.bookings.history.filters;
  return {
    bookings: getHistoryUserBookings(state),
    pagination: getHistoryUserBookingsPagination(state),
    ...filters
  };
}

export default connect(mapStateToProps, {
  loadHistoryUserBookings,
  setHistoryUserBookingsPage,
  setHistoryUserBookingsSearchFilter,
})(HistoryUserBookingsPage);
