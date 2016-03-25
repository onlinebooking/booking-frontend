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
      bookingBtn = (
        <button
          className="btn btn-primary"
          onClick={() => onRangeBooked(range)}>Book me!</button>
      );
    }

    return (
      <ListGroupItem className="booking-item">
        <div className="pull-left booking-item-time">{start} - {end}</div>
        <div className="pull-right">{bookingBtn}</div>
        <div className="clearfix"></div>
      </ListGroupItem>
    );
  }
}

export default class BookingRangeList extends React.Component {

  render() {
    const { ranges, date, onUndo, showBookingButton, onRangeBooked } = this.props;
    return (
      <div>
        <div className="booking-range-list-header">
          <div className="pull-left">Disponibilità del {date}</div>
          <div className="pull-right point" onClick={onUndo}>Cambia giorno</div>
          <div className="clearfix"></div>
        </div>
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
