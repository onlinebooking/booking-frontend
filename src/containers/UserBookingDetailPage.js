import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { makeGetUserBooking } from '../selectors/bookings';
import Spinner from '../components/Spinner';
import ErrorAlert from '../components/ErrorAlert';
import { actionOnUserBooking } from '../actions/user-bookings';

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
          <hr />
          <div>{this.renderBookingActions()}</div>
        </div>
      </div>
     );
  }

  renderBookingActions() {
    const {
      booking: { reachableStates, id },
      currentActionName,
      isActionSaving
    } = this.props;

    // Performing action...
    if (isActionSaving) {
      return (
        <div>
          <div>{currentActionName}</div>
          <Spinner />
        </div>
      );
    }

    // Render the reachable actions
    return (
      <div>
      {this.renderBookingActionError()}
      {reachableStates.map(a => (
        <button
          key={a}
          onClick={() => this.props.actionOnUserBooking(id, a)}>{a}</button>
      ))}
      </div>
    );
  }

  renderBookingActionError() {
    const { actionError, currentActionName } = this.props;

    if (actionError) {
      return (
        <ErrorAlert
          title={`Errore durante ${currentActionName}.`}
          {...actionError}
        />
      );
    }
  }
}

const makeMapStateToProps = () => {
  const getUserBooking = makeGetUserBooking();
  const mapStateToProps = (state, props) => {
    const { bookingId } = props.params;
    const actionPerformed = state.userData.bookings.actions[bookingId] || {};

    return {
      booking: getUserBooking(state, props),
      currentActionName: actionPerformed.actionName,
      actionError: actionPerformed.error,
      isActionSaving: actionPerformed.isSaving,
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps, {
  actionOnUserBooking,
})(UserBookingDetailPage);
