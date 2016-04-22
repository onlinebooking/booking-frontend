import React from 'react';
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
          onClick={() => onRangeBooked(range)}>Prenota</button>
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
    const { ranges, date, changeDateUrl, showBookingButton, onRangeBooked } = this.props;
    const formattedDate = moment(date, 'YYYY-MM-DD').format('dddd D MMMM YYYY');

    return (
      <div>
        <div className="booking-range-list-header">
          <div className="pull-left">{formattedDate}</div>
          <div className="pull-right">
            <Link className="change-day-link" to={changeDateUrl}>Cambia Giorno</Link>
          </div>
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
