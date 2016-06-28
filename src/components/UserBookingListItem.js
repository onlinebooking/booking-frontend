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
      <Link to={`/my-bookings/${id}`} className="no-link-style">
        <ListGroupItem>
            <div className="pull-left">
              <h4 className="text-primary">{service.name}</h4>
              <div>{service.shop.name}</div>
              <div>{formattedDate}</div>
              <div>{start} - {end}</div>
            </div>
            <div className="pull-right">
              <h5>{humanizeBookingStatus(status)}</h5>
            </div>
            <div className="clearfix"/>
        </ListGroupItem>
      </Link>
    );
  }
}
