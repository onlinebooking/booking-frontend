import React from 'react';
import { values } from 'lodash';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import moment from 'moment';

class UserBookingListItem extends React.Component {

  render() {
    const { service, status } = this.props;

    const formattedDate = moment(this.props.start, moment.ISO_8601).format('dddd D MMMM YYYY');
    const formattedRange = {
      start: moment(this.props.start, moment.ISO_8601).format('HH:mm'),
      end: moment(this.props.end, moment.ISO_8601).format('HH:mm')
    };
    const { start, end } = formattedRange;

    return (
      <ListGroupItem>
        <div>{service.name}</div>
        <div>{service.shop.name}</div>
        <div>{formattedDate}</div>
        <div>{start} - {end}</div>
        <div>{status}</div>
      </ListGroupItem>
    );
  }
}

export default class UserBookingsList extends React.Component {

  render() {
    const { bookings } = this.props;
    return (
      <div>
        <ListGroup>
          {bookings.map(booking => (
            <UserBookingListItem {...booking} key={booking.id} />
          ))}
        </ListGroup>
      </div>
    );
  }
}
