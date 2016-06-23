import React from 'react';
import classNames from 'classnames';

export default class Spinner extends React.Component {

  render() {
    const spinnerClass = classNames('huge-loader', { 'loader-hidden' : !this.props.show })
    return (
      <div className={spinnerClass}>
        <p className="loading-spinner text-center">
          
        </p>
      </div>
    );
  }
}
