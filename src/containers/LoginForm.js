import React from 'react';
import Spinner from '../components/Spinner';
import { reduxForm } from 'redux-form';
import { login } from '../actions/auth';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
import {
  createValidator,
  required,
  email as emailValidationRule
} from '../utils/validation';

const submitLogin = (values, dispatch) => {
  return dispatch(login(values));
};

class LoginForm extends React.Component {

  render() {
    const { userName } = this.props;

    return (
      <div>
        {
          userName &&
          <h3>Bentornato {userName}! Grazie per esserti registrato in Qando!</h3>
        }
        {this.renderForm()}
      </div>
    );
  }

  renderErrors() {
    const { authError, authLoading } = this.props;

    // TODO: Improve error handling divide by 400 Bad login and other errors...
    if (authError && !authLoading) {
      return (
        <div>
          <br />
          <div className="alert alert-danger">
            Invalid credentials.
          </div>
        </div>
      );
    }
  }

  renderForm() {
    const {
      fields: { email, password },
      handleSubmit,
      authLoading
    } = this.props

    return (
      <form onSubmit={handleSubmit(submitLogin)} noValidate>

        <FormGroup
          controlId="formControlsEmail"
          validationState={(email.touched && email.error) ? 'error' : null}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            placeholder="Email"
            disabled={authLoading}
            {...email}
          />
          {email.touched && email.error && <HelpBlock>{email.error}</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="formControlsPassword"
          validationState={(password.touched && password.error) ? 'error' : null}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            placeholder="Password"
            disabled={authLoading}
            {...password}
          />
          {password.touched && password.error && <HelpBlock>{password.error}</HelpBlock>}
        </FormGroup>

        {(() => {
          if (authLoading) {
            return <Spinner />;
          }

          return <button className="btn btn-primary">Login</button>;
        })()}
        {this.renderErrors()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    authLoading: state.auth.loading,
    authError: state.auth.error,
    userName: state.auth.name, // Came from registration link
    initialValues: {
      email: state.auth.email || '',
    },
  };
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: createValidator({
    email: [required, emailValidationRule],
    password: [required],
  })
}, mapStateToProps)(LoginForm);
