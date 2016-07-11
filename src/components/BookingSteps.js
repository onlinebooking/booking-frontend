import React, { Component } from 'react';
import classNames from 'classnames';

const steps = [
  {
    text: 'Seleziona data'
  },
  {
    text: 'Seleziona ora'
  },
  {
    text: 'Conferma'
  }
];

export default class BookingSteps extends Component {
  render() {
    const { step } = this.props;
    console.log(step);
    return (
      <div className="booking-steps">
        {steps.map(({text}, i) => (
          <div className="step" key={i}>
            {i !== 0 && <div className="step-line-left"></div>}

            <div className="step-circle">
              <div className={classNames('pin', {
                'active': step === (i + 1),
                'completed': (i + 1) < step,
              })}></div>
            </div>
            <div className="step-text">{text}</div>

            {i !== (steps.length - 1) && <div className="step-line-right"></div>}
          </div>
        ))}
      </div>
    );
  }
}
