import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { makeGetUserBooking } from '../selectors/bookings';
import { humanizeBookingStatus, humanizeBookingAction } from '../utils/booking';
import Spinner from '../components/Spinner';
import ErrorAlert from '../components/ErrorAlert';
import {
  actionOnUserBooking,
  loadUserBooking,
  clearActionErrorOnUserBooking
} from '../actions/user-bookings';

function loadData(props) {
  const { bookingId } = props.params;
  props.loadUserBooking(bookingId);
  props.clearActionErrorOnUserBooking(bookingId);
}

class UserBookingDetailPage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.bookingId !== this.props.params.bookingId) {
      loadData(nextProps);
    }
  }

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
          <Link to={'/my-bookings/incoming'}>Elenco Prenotazioni</Link>
        </div>
        <br />
        <div>
          <div>{service.name}</div>
          <div>{shop.name}</div>
          <div>{formattedDate}</div>
          <div>{formattedRange.start} - {formattedRange.end}</div>
          <div>{humanizeBookingStatus(status)}</div>
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
          <div>{humanizeBookingAction(currentActionName)}</div>
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
          onClick={() => this.props.actionOnUserBooking(id, a)}
        >{humanizeBookingAction(a)}</button>
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
  loadUserBooking,
  clearActionErrorOnUserBooking,
  actionOnUserBooking,
})(UserBookingDetailPage);
