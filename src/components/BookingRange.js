import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Spinner from './Spinner';
import ErrorAlert from './ErrorAlert';
import Form from "react-jsonschema-form";

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
      <div className="booking-range-container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          {formattedDate} {start} - {end}
        </div>
        <div className="panel-body">
          <div className="booking-range">
            {this.renderContent()}
          </div>
        </div>
      </div>

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

    // Render actions: form, cofrim, change dates...
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
    const { schema, onConfirmBooking, changeRangeUrl, changeDateUrl } = this.props;
    const onSubmit = ({ formData }) => onConfirmBooking({ bookingOptions: formData });

    return (
      <div>
        <Form
          className="booking-form"
          schema={schema}
          onSubmit={onSubmit}>
          <div className="text-center">
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginBottom: '10px' }}>Conferma Prenotazione</button>
          </div>
        </Form>
        <div className="text-center">
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
    const { bookedRange, user } = this.props;

    return (
      <div>
        <h3>Prenotazione effettuata con successo!</h3>
        <p>
          Riceverai una mail di conferma all'indirizzo<br/>
        <span className="text-primary">{user.email}</span>
        </p>
        <br/>
        <br/>
        <div className="text-center">
          <Link className="btn btn-success" to={`/my-bookings/${bookedRange.id}`}>Visualizza prenotazione</Link>
          <Link className="btn btn-primary" to={'/my-bookings/incoming'}>Lista Prenotazioni</Link>
        </div>
      </div>
    );
  }
}
