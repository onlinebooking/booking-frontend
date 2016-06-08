import React from 'react';
import { Alert } from 'react-bootstrap';

export default class ErrorAlert extends React.Component {

  render() {
    const { status, statusText, title } = this.props;

    return (
      <Alert bsStyle="danger">
        <h4>{title}</h4>
        {
          typeof status !== 'undefined'
          ? <p>{status} {statusText}</p>
          : <p>
              <div>Unvailable API service</div>
              <div>A TEAM of expert monkeys is trying to fix the problem.</div>
            </p>
        }
        {this.props.children}
      </Alert>
    );
  }
}
