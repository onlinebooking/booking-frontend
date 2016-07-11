import React from 'react';
import classNames from 'classnames';

export default class Spinner extends React.Component {

  render() {
    const spinnerClass = classNames('spinner', { 'spinner-fullpage' : this.props.fullpage });
    return (
      <div className={spinnerClass}>
        <img src="/static/spinner.svg" width="52px"/>
        {this.props.children}
      </div>
    );
  }
}
