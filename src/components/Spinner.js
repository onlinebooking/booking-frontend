import React from 'react';
import classNames from 'classnames';

export default class Spinner extends React.Component {

  render() {
    //const spinnerClass = classNames('huge-loader', { 'loader-hidden' : !this.props.show })
    return (
      <div className="loading-spinner text-center">
        <img src="/static/spinner.svg" />
      </div>
    );
  }
}
