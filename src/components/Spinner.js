import React from 'react';

export default class Spinner extends React.Component {

  render() {
    return (
      <div className="spinner">
        <img src="/static/spinner.gif" />
      </div>
    );
  }
}
