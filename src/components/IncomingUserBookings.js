import React from 'react';
import { Link } from 'react-router';
import UserBookingListItem from './UserBookingListItem';
import {
  humanizeBookingStatus,
  getBookingsStatusesList
} from '../utils/booking';
import {
  ListGroup,
  ListGroupItem,
  Badge,
  FormGroup,
  FormControl,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import {
  INCOMING_USER_BOOKINGS_BY_SHOP,
  INCOMING_USER_BOOKINGS_LIST,
} from '../constants/ViewTypes';

class IncomingUserBookingsList extends React.Component {

  render() {
    const { bookingsCount, bookingsCountFiltered, loading, statusFilter } = this.props;
    const opacity = loading ? '0.5' : '1';

    return (
      <div>
        <div className="booking-list-counter text-muted">{humanizeBookingStatus(statusFilter)}: {bookingsCountFiltered} di {bookingsCount} prenotazioni</div>
        <div style={{opacity}}>
          {this.renderList()}
        </div>
      </div>
    );
  }

  renderList() {
    const { view } = this.props;

    switch (view) {
      case INCOMING_USER_BOOKINGS_LIST:
        return this.renderBookingsListView();

      case INCOMING_USER_BOOKINGS_BY_SHOP:
        return this.renderBookingsByShopView();
    }
  }

  renderBookingsListView() {
    const { bookings } = this.props;

    return (
      <ListGroup>
        {bookings.map(booking => (
          <UserBookingListItem {...booking} key={booking.id} />
        ))}
      </ListGroup>
    );
  }

  renderBookingsByShopView() {
    const { bookings } = this.props;

    return (
      <div>
        {bookings.map(({ shop, bookings }) => (
          <div key={shop.id}>

            <ListGroup>
              <ListGroupItem className="booking-list-header">
                <h4>{shop.name}</h4>
                <p>{bookings.length} prenotazioni</p>
              </ListGroupItem>

            {bookings.map(booking => (
              <UserBookingListItem {...booking} key={booking.id} />
            ))}
            </ListGroup>
          </div>
        ))}
      </div>
    );
  }
}

class IncomingUserBookingsControls extends React.Component {

  render() {
    return (
      <div>
        {this.renderSearchBar()}
        {this.renderStatusFilterButtons()}
        <br />
        <br />
        {this.renderViewSwitcher()}
      </div>
    );
  }

  renderSearchBar() {
    const { searchText, onSearchTextChanged } = this.props;

    return (
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Cerca"
          value={searchText}
          onChange={e => onSearchTextChanged(e.target.value)} />
      </FormGroup>
    );
  }

  renderStatusFilterButtons() {
    const { statusFilter, onStatusFilterChanged } = this.props;

    return (
      <ButtonGroup>
        {getBookingsStatusesList().map(status => (
          <Button
            key={status}
            className={{ 'active': status === statusFilter }}
            onClick={() => onStatusFilterChanged(status)}
          >{humanizeBookingStatus(status)}</Button>
        ))}
        <Button
          className={{ 'active': statusFilter === null }}
          onClick={() => onStatusFilterChanged(null)}
        >Tutti</Button>
      </ButtonGroup>
    );
  }

  renderViewSwitcher() {
    const { searchText, statusFilter } = this.props;

    return (
      <div>
        <Link to={`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_LIST}?search=${searchText}&status=${statusFilter}`}>Elenco completo</Link>
        {' | '}
        <Link to={`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_BY_SHOP}?search=${searchText}&status=${statusFilter}`}>Elenco per shop</Link>
      </div>
    );
  }
}

export default class IncomingUserBookings extends React.Component {

  render() {
    const {
      bookings,
      bookingsCount,
      bookingsCountFiltered,
      loading,
      searchText,
      statusFilter,
      view,
      onStatusFilterChanged,
      onSearchTextChanged
    } = this.props;

    return (
      <div>
        <IncomingUserBookingsControls
          searchText={searchText}
          statusFilter={statusFilter}
          view={view}
          onSearchTextChanged={onSearchTextChanged}
          onStatusFilterChanged={onStatusFilterChanged}
        />
        <hr />
        <IncomingUserBookingsList
          bookings={bookings}
          bookingsCount={bookingsCount}
          bookingsCountFiltered={bookingsCountFiltered}
          statusFilter={statusFilter}
          loading={loading}
          view={view}
        />
      </div>
    );
  }
}
