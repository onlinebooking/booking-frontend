import React from 'react';

export default class BookingRange extends React.Component {

  render() {
    const { range: { start, end }, date, loading, bookedRange, error } = this.props;

    return (
      <div>
        <h3>{date}</h3>
        <h3>{start} - {end}</h3>
        <button>Prenota</button>
      </div>
    );
  }
}
