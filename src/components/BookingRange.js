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

    // TODO: Default form data / Initial form data by server
    return (
      <div>
        <Form
          className="booking-form"
          schema={schema}
          onSubmit={onSubmit}>
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginBottom: '10px' }}>Conferma Prenotazione</button>
        </Form>
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
        <div><Link to={'/my-bookings/incoming'}>Lista Prenotazioni</Link></div>
      </div>
    );
  }
}
