import React from 'react';
import moment from 'moment';
import 'fullcalendar/dist/fullcalendar.min.css';
const $ = window.$;

console.log("kkk", $.aaa)


export default class BookingCalendar extends React.Component {

    updateCalendarEvents(events){
        const { calendar } = this.refs;
        $(calendar)
            .fullCalendar('removeEvents')
        $(calendar)
        .fullCalendar('addEventSource', events);       


    }

    componentDidMount(){
        const { calendar } = this.refs;
        $(calendar).fullCalendar({
            events : this.props.events,
            defaultDate : this.props.defaultDate,
            viewRender : (view) => { 
                this.props.onCalendarChange(view.start, view.end);
            }
        });
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.events != this.props.events) {
            this.updateCalendarEvents(nextProps.events)
        }
    }

    componentWillUnmount(){
        const { calendar } = this.refs;   
    }

    render(){
        
        return <div ref="calendar"></div>;
    }

}