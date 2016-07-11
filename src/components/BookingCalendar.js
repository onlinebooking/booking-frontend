import React from 'react';
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';

export default class BookingCalendar extends React.Component {

  updateCalendarEvents(events) {
    const { calendar } = this.refs;
    $(calendar)
      .fullCalendar('removeEvents')
    $(calendar)
      .fullCalendar('addEventSource', events);
  }

  updateCalendarDate(date) {
    const { calendar } = this.refs;
    const currentCalendarDate = $(calendar)
      .fullCalendar('getDate').format('YYYY-MM-DD');
    if (date != currentCalendarDate) {
      $(calendar).fullCalendar('gotoDate', date);
    }
  }

  setClassesToBookedDayCell() {
    const { calendar } = this.refs;
    const events = $(calendar).fullCalendar('clientEvents');

    // Add booked-day class to day with events
    $(calendar).find('.fc-day').removeClass('booked-day');
    $(calendar).find('.fc-day-number').removeClass('booked-day-number');
    events.forEach(event => {
      const strDate = event.date.format('YYYY-MM-DD');
      $(calendar)
        .find(`.fc-day-number[data-date="${strDate}"]`)
        .addClass('booked-day-number');
      $(calendar)
        .find(`.fc-day[data-date="${strDate}"]`)
        .addClass('booked-day');
    });
  }

  componentDidMount() {
    const { calendar } = this.refs;

    $(calendar).fullCalendar({
      lang: 'it',
      height:'auto',
      events: this.props.events,
      dayClick: date => {
        const events = this.props.events;
        events.filter(event => {
          return date.format() === event.date.format('YYYY-MM-DD');
        }).forEach(event => this.props.onEventClick(event));
      },
      defaultDate: this.props.calendarDate,
      eventClick: event => this.props.onEventClick(event),
      viewRender: view => this.props.onCalendarChange(view.calendar.getDate()),
      eventAfterAllRender: view => this.setClassesToBookedDayCell(),
      eventRender : (event, element) => {
        element.find(".fc-title").prepend("<i class='glyphicon glyphicon-tags'></i>");
      }
    });
  }

  componentWillUnmount() {
    const { calendar } = this.refs;
    $(calendar).fullCalendar('destroy');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events != this.props.events) {
      this.updateCalendarEvents(nextProps.events)
    }

    if (nextProps.calendarDate != this.props.calendarDate) {
      this.updateCalendarDate(nextProps.calendarDate);
    }
  }

  render() {
    return <div ref="calendar"></div>;
  }
}
