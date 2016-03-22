import React from 'react';
import { values } from 'lodash';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import moment from 'moment';

class BookingRangeItem extends React.Component {

  render() {
    const { range, showBookingButton, onRangeBooked } = this.props;
    const start = moment(range.start).format('HH:mm');
    const end = moment(range.end).format('HH:mm');

    let bookingBtn = null;
    if (showBookingButton) {
      bookingBtn = <button onClick={() => onRangeBooked(range)}>Book me!</button>;
    }

    return (
        <ListGroupItem>
          <div>{start}</div>
          <div>{end}</div>
          {bookingBtn}
        </ListGroupItem>
    );
  }
}

export default class BookingRangeList extends React.Component {

  render() {
    const { ranges, onUndo, showBookingButton, onRangeBooked } = this.props;
    return (
      <div>
        <button className="btn btn-default" onClick={onUndo}>Undo</button>
        <ListGroup>
          {ranges.map((range) => {
            const key = `${range.start}_${range.end}`;
            return <BookingRangeItem
              showBookingButton={showBookingButton}
              onRangeBooked={onRangeBooked}
              range={range}
              key={key}
            />;
          })}
        </ListGroup>
      </div>
    );
  }
}
