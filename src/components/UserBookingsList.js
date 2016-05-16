import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Image, Badge } from 'react-bootstrap';
import moment from 'moment';
import {
  INCOMING_USER_BOOKINGS_BY_SHOP,
  INCOMING_USER_BOOKINGS_LIST,
} from '../constants/ViewTypes';

class UserBookingListItem extends React.Component {

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
            <div>{status}</div>
        </ListGroupItem>
      </Link>
    );
  }
}

export default class UserBookingsList extends React.Component {

  render() {
    return (
      <div>
        <div>
          <Link to={`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_LIST}`}>List</Link>
          {' | '}
          <Link to={`/my-bookings/incoming/${INCOMING_USER_BOOKINGS_BY_SHOP}`}>Per Shop</Link>
        </div>
        {this.renderList()}
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
          <div key={shop.id} style={{ padding: '10px' }}>
            <p>{shop.name} <Badge>{bookings.length}</Badge></p>
            {bookings.map(booking => (
              <UserBookingListItem {...booking} key={booking.id} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
