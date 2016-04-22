import React from 'react';
import { Alert } from 'react-bootstrap';

export default class ErrorAlert extends React.Component {

  render() {
    const { status, statusText, title } = this.props;

    return (
      <Alert bsStyle="danger">
        <h4>{title}</h4>
        <p>{status} {statusText}</p>
        {this.props.children}
      </Alert>
    );
  }
}
