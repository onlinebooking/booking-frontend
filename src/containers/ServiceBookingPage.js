import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';
import BookingCalendar from '../components/BookingCalendar';
import BookingRangeList from '../components/BookingRangeList';
import Spinner from '../components/Spinner';
import { keys } from 'lodash';
import classNames from 'classnames';
import {
  loadBookingRanges,
  setViewedDate,
  setBookingCalendarDate,
} from '../actions';

function createCalendarEvents(availableDates){
  return availableDates.map(date => {
    return {
      title : 'Book Me!',
      date : moment(date, 'YYYY-MM-DD'),
      allDay : true
    };
  });
}

class ServiceBookingPage extends React.Component {

  onCalendarChange(calendarDate) {
    const date = calendarDate.format('YYYY-MM-DD');
    if (date != this.props.calendarDate) {
      this.props.setBookingCalendarDate(date);
      this.props.loadBookingRanges();
    }
  }

  onEventClick(event) {
    this.props.setViewedDate(event.date.format('YYYY-MM-DD'));
  }

  onRangeBooked(range) {
    alert(`Want to book ${range.start} - ${range.end}`);
  }

  render() {

    if (!this.props.shop || !this.props.service) {
      return <Spinner />;
    }

    return (
      <div>
        {this.renderTopShopAndServiceInfo()}
        {this.renderBookingView()}
      </div>
    );
  }

  renderTopShopAndServiceInfo() {
    const { shop, service } = this.props;

    return (
      <div>
        <div className="service-description">
          { shop.name } - { service.name }
        </div>
      </div>
    );
  }

  renderBookingView() {
    const hideCalendar = !!this.props.viewedRanges;
    const calendar = (
      <div className={classNames({
        'hide': hideCalendar
      })}>
        {this.renderBookingCalendar()}
      </div>
    );

    if (hideCalendar) {
      return (
        <div>
          {calendar}
          {this.renderBookingRangesList()}
        </div>
      );
    } else {
      return (
        <div>
          {calendar}
        </div>
      );
    }
  }

  renderBookingCalendar() {
    return (
      <div className="booking-calendar-container">
        <BookingCalendar
          events={createCalendarEvents(this.props.availableDates)}
          calendarDate={this.props.calendarDate}
          onEventClick={this.onEventClick.bind(this)}
          onCalendarChange={this.onCalendarChange.bind(this)} />
      </div>
    );
  }

  renderBookingRangesList() {
    return (
      <div>
        <BookingRangeList
          ranges={this.props.viewedRanges}
          showBookingButton={true}
          onRangeBooked={this.onRangeBooked.bind(this)}
          onUndo={() => this.props.setViewedDate(null)}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const shopId = ownProps.params.shopId;
  const serviceId = ownProps.params.serviceId;
  const shop = state.entities.shops[shopId];
  let service;

  // Is a service shop?
  if (shop) {
    service = state.entities.services[serviceId];
    if (service && Number(service.shop) !== Number(shop.id)) {
      service = null;
    }
  }

  const { viewedDate, calendarDate, ranges } = state.booking;
  const viewedRanges = viewedDate ? ranges.items[viewedDate] : null;

  return {
    shop,
    service,
    calendarDate,
    availableDates: keys(ranges.items),
    viewedRanges,
    //selectedRange: state.booking.selectedRange,
    //viewedDate: state.booking.viewedDate,
  };
}

export default connect(mapStateToProps, {
  setBookingCalendarDate,
  loadBookingRanges,
  setViewedDate,
})(ServiceBookingPage);
