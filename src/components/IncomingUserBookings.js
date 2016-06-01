import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
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

class IncomingUserBookingListItem extends React.Component {

  render() {
    const { service, status, id } = this.props;

    const formattedDate = moment(this.props.start, moment.ISO_8601).format('dddd D MMMM YYYY');
    const formattedRange = {
      start: moment(this.props.start, moment.ISO_8601).format('HH:mm'),
      end: moment(this.props.end, moment.ISO_8601).format('HH:mm')
    };
    const { start, end } = formattedRange;

    return (
      <Link to={`/my-bookings/${id}`}>
        <ListGroupItem>
            <div>{service.name}</div>
            <div>{service.shop.name}</div>
            <div>{formattedDate}</div>
            <div>{start} - {end}</div>
            <div>{humanizeBookingStatus(status)}</div>
        </ListGroupItem>
      </Link>
    );
  }
}

class IncomingUserBookingsList extends React.Component {

  render() {
    const { bookingsCount, bookingsCountFiltered, loading } = this.props;
    const opacity = loading ? '0.5' : '1';

    return (
      <div>
        <div>{bookingsCountFiltered} di {bookingsCount}</div>
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
          <IncomingUserBookingListItem {...booking} key={booking.id} />
        ))}
      </ListGroup>
    );
  }

  renderBookingsByShopView() {
    const { bookings } = this.props;

    return (
      <div>
        {bookings.map(({ shop, bookings }) => (
          <div key={shop.id} style={{ padding: '10px' }}>
            <p>{shop.name} <Badge>{bookings.length}</Badge></p>
            {bookings.map(booking => (
              <IncomingUserBookingListItem {...booking} key={booking.id} />
            ))}
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
        <Link to={`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_LIST}?search=${searchText}&status=${statusFilter}`}>List</Link>
        {' | '}
        <Link to={`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_BY_SHOP}?search=${searchText}&status=${statusFilter}`}>Per Shop</Link>
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
          loading={loading}
          view={view}
        />
      </div>
    );
  }
}
