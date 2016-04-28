import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Spinner from './Spinner';
import ErrorAlert from './ErrorAlert';

export default class BookingRange extends React.Component {

  render() {
    const { range, date } = this.props;
    const formattedDate = moment(date, 'YYYY-MM-DD').format('dddd D MMMM YYYY');
    const formattedRange = {
      start: moment(range.start, moment.ISO_8601).format('HH:mm'),
      end: moment(range.end, moment.ISO_8601).format('HH:mm')
    };
    const { start, end } = formattedRange;

    return (
      <div className="booking-range">
        <h3>{formattedDate} {start} - {end}</h3>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    const { loading, error, bookedRange } = this.props;

    // Waiting for booking result...
    if (loading) {
      return <Spinner />;
    }

    // Error in booking...
    if (error) {
      return this.renderError();
    }

    // Show info abuto booked range
    if (bookedRange) {
      return this.renderBookedRange();
    }

    // Render actions: cofrim, change dates...
    return this.renderActions();
  }

  renderError() {
    const { error } = this.props;

    return (
      <ErrorAlert
        title={'Impossibile prenotare.'}
        {...error}
      />
    );
  }

  renderActions() {
    const { onConfirmBooking, changeRangeUrl, changeDateUrl } = this.props;

    return (
      <div>
        <button
          className="btn btn-success"
          onClick={onConfirmBooking}
          style={{ marginBottom: '10px' }}>Conferma Prenotazione</button>
        <div>
          <Link
            className="btn btn-primary"
            to={changeRangeUrl}>Cambia Orario</Link>
          <Link
            className="btn btn-primary"
            to={changeDateUrl}
            style={{ marginLeft: '10px' }}>Cambia Giorno</Link>
        </div>
      </div>
    );
  }

  renderBookedRange() {
    const { bookedRange } = this.props;

    return (
      <div>
        Prenotazione effettuata con successo!
        <div><Link to={`/my-bookings/${bookedRange.id}`}>Prenotazione</Link></div>
        <div><Link to={'/my-bookings'}>Lista Prenotazioni</Link></div>
      </div>
    );
  }
}
