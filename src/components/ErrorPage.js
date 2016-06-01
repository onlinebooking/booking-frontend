import React from 'react';
//import { Image } from 'react-bootstrap';

export default class ErrorPage extends React.Component {

  isHttpError() {
    return typeof this.props.error.status !== 'undefined';
  }

  render() {
    return (
      <div className="error-container">
        {this.renderErrorContent()}
      </div>
    );
  }

  renderErrorContent() {
    if (this.isHttpError()) {
      return this.renderHttpError();
    }

    // If not an http error this is the only motivation...
    return this.renderFetchError();
  }

  renderHttpError() {
    const { status, statusText } = this.props.error;
    return (
      <div>
        <h1 className={`status status-${status}`}>{status}</h1>
        <h2 className={`status-text status-text-${status}`}>{statusText}</h2>
      </div>
    );
  }

  renderFetchError() {
    return (
      <div>
        <h1 className="no-service-title">Unvailable API service</h1>
        <h3 className="no-service-description">A TEAM of expert monkeys is trying to fix the problem.</h3>
      </div>
    );
  }
}
