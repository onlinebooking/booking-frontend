import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class BookingRange extends React.Component {

  render() {
    const {
      range,
      date,
      loading,
      bookedRange,
      error,
      changeDateUrl,
      changeRangeUrl
    } = this.props;
    const formattedDate = moment(date, 'YYYY-MM-DD').format('dddd D MMMM YYYY');
    const formattedRange = {
      start: moment(range.start, moment.ISO_8601).format('HH:mm'),
      end: moment(range.end, moment.ISO_8601).format('HH:mm')
    };
    const { start, end } = formattedRange;

    return (
      <div className="booking-range">
        <h3>{formattedDate} {start} - {end}</h3>
        <button className="btn btn-success" style={{ marginBottom: '10px' }}>Conferma Prenotazione</button>
        <div>
          <Link className="btn btn-primary" to={changeRangeUrl}>Cambia Orario</Link>
          <Link className="btn btn-primary" to={changeDateUrl} style={{ marginLeft: '10px' }}>Cambia Giorno</Link>
        </div>
      </div>
    );
  }
}
