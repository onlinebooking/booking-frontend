import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class InvalidBookPeriod extends React.Component {

  render() {
    const { date, isDateBookable, range, changeDateUrl, changeRangeUrl } = this.props;
    const formattedDate = moment(date, 'YYYY-MM-DD').format('dddd D MMMM YYYY');

    if (isDateBookable) {
      const formattedRange = {
        start: moment(range.start, moment.ISO_8601).format('HH:mm'),
        end: moment(range.end, moment.ISO_8601).format('HH:mm')
      };
      return (
        <div className="no-books">
          <div className="no-books-text">
            <div>{formattedDate}</div>
            <div>L'orario {formattedRange.start} - {formattedRange.end} non è disponibile.</div>
          </div>
          <Link className="btn btn-primary" to={changeRangeUrl}>Cambia Orario</Link>
          <Link className="btn btn-primary" to={changeDateUrl} style={{marginLeft:'10px'}}>Cambia Giorno</Link>
        </div>
      );
    } else {
      return (
        <div className="no-books">
          <div className="no-books-text">
            <div>{formattedDate}</div>
            <div>Data non disponibile.</div>
          </div>
          <Link className="btn btn-primary" to={changeDateUrl}>Cambia Giorno</Link>
        </div>
      );
    }
  }
}
