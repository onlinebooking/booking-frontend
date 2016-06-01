import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import {
  humanizeBookingStatus
} from '../utils/booking';
import {
  ListGroupItem
} from 'react-bootstrap';

export default class UserBookingListItem extends React.Component {

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
