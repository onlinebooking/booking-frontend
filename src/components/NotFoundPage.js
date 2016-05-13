import React from 'react';
import ErrorPage from './ErrorPage';

export default class NotFoundPage extends React.Component {

  render() {
    return (
      <ErrorPage error={{ status: 404, statusText: 'Not Found' }} />
    );
  }
}
