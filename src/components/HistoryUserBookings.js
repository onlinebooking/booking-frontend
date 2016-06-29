import React from 'react';
import classNames from 'classnames';
import UserBookingListItem from './UserBookingListItem';
import { range } from 'lodash';
import {
  humanizeBookingStatus
} from '../utils/booking';
import {
  ListGroup,
  Badge,
  FormGroup,
  FormControl,
  ButtonGroup,
  Button
} from 'react-bootstrap';

// TODO: Let it become an util general purpose component...
class Paginator extends React.Component  {

  render() {
    const { count, pages, pageSize, currentPage, onSetPage } = this.props;

    return (
      <div className="paginator">
        <ButtonGroup>
          {range(1, pages + 1).map(page => (
            <Button
              key={page}
              onClick={() => onSetPage(page)}
              className={classNames({
                'active': page === currentPage
            })}>{page}</Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

class HistoryUserBookingsList extends React.Component {

  render() {
    const {
      bookings
    } = this.props;

    return (
      <ListGroup>
        {bookings.map(booking => (
          <UserBookingListItem {...booking} key={booking.id} />
        ))}
      </ListGroup>
    );
  }
}

class HistoryUserBookingsControls extends React.Component {

  render() {
    return (
      <div>
        {this.renderSearchBar()}
      </div>
    );
  }

  renderSearchBar() {
    const { searchText, onSearchTextChanged } = this.props;

    return (
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Cerca"
          value={searchText}
          onChange={e => onSearchTextChanged(e.target.value)} />
      </FormGroup>
    );
  }
}

export default class HistoryUserBookings extends React.Component {

  render() {
    const {
      bookings,
      pagination,
      onSetPage,
      searchText,
      onSearchTextChanged
    } = this.props;

    return (
      <div>
        <HistoryUserBookingsControls
          searchText={searchText}
          onSearchTextChanged={onSearchTextChanged}
        />
        <hr />
        <HistoryUserBookingsList
          bookings={bookings}
        />
        <Paginator
          onSetPage={onSetPage}
          {...pagination}
        />
      </div>
    );
  }
}
