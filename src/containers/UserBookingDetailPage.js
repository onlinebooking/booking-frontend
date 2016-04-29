import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { makeGetUserBooking } from '../selectors/bookings';
import Spinner from '../components/Spinner';
import moment from 'moment';

class UserBookingDetailPage extends React.Component {

  render() {
    const { booking } = this.props;

    if (!booking) {
      return <Spinner />;
    }

    return this.renderBooking();
  }

  renderBooking() {
    const { booking: { id, service, start, end, status } } = this.props;
    const { shop } = service;

    const formattedDate = moment(start, moment.ISO_8601).format('dddd D MMMM YYYY');
    const formattedRange = {
      start: moment(start, moment.ISO_8601).format('HH:mm'),
      end: moment(end, moment.ISO_8601).format('HH:mm')
    };

    return (
      <div>
        <div>
          <Link to={'/my-bookings'}>Elenco Prenotazioni</Link>
        </div>
        <br />
        <div>
          <div>{service.name}</div>
          <div>{shop.name}</div>
          <div>{formattedDate}</div>
          <div>{formattedRange.start} - {formattedRange.end}</div>
          <div>{status}</div>
        </div>
      </div>
     );
  }
}

const makeMapStateToProps = () => {
  const getUserBooking = makeGetUserBooking();
  const mapStateToProps = (state, props) => {
    return {
      booking: getUserBooking(state, props)
    };
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(UserBookingDetailPage);
