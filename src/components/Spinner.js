import React from 'react';
import classNames from 'classnames';

export default class Spinner extends React.Component {

  render() {
    const spinnerClass = classNames('text-center', { 'spinner-fullpage' : this.props.fullpage })
    return (
      <div className={spinnerClass}>
        <img src="/static/spinner.svg" width="52px"/>
      </div>
    );
  }
}
