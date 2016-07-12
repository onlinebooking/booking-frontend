import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Spinner from '../components/Spinner';
import { rejectFormErrorsFromResponse } from '../utils/form';
import { updateUserPassword } from '../actions/user-profile';
import {
  createValidator,
  required,
  match,
  withMessage,
  minLength
} from '../utils/validation';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
  Alert
} from 'react-bootstrap';

const submit = (values, dispatch) =>
  dispatch(updateUserPassword(values.password)).then(rejectFormErrorsFromResponse);

class UpdateUserPasswordForm extends Component {
  render() {
    const {
      fields: { password, confirmedPassword },
      handleSubmit,
      submitting,
      showSuccessMessage
    } = this.props;

    return (
      <form onSubmit={handleSubmit(submit)} noValidate>

        <FormGroup
          controlId="formControlsPassword"
          validationState={(password.touched && password.error) ? 'error' : null}
        >
          <ControlLabel>Nuova password</ControlLabel>
          <FormControl type="password" placeholder="Nuova password" {...password} />
          {password.touched && password.error && <HelpBlock>{password.error}</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="formControlsConfirmedPassword"
          validationState={(confirmedPassword.touched && confirmedPassword.error) ? 'error' : null}
        >
          <ControlLabel>Conferma nuova password</ControlLabel>
          <FormControl type="password" placeholder="Conferma Nuova password" {...confirmedPassword} />
          {confirmedPassword.touched && confirmedPassword.error && <HelpBlock>{confirmedPassword.error}</HelpBlock>}
        </FormGroup>

        {
          submitting
          ? <Spinner />
          : <FormGroup>
              <Button type="submit">
              Cambia Password
              </Button>
            </FormGroup>
        }

        {showSuccessMessage && (
          <Alert bsStyle="success">
            Password cambiata correttamente.
          </Alert>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  showSuccessMessage: state.userData.profile.succesUpdatePassword,
});

export default reduxForm({
  form: 'update-user-password',
  fields: ['password', 'confirmedPassword'],
  validate: createValidator({
    password: [required, minLength(5)],
    confirmedPassword: [
      required,
      withMessage(match('password'), 'Le due password non combaciano')
    ]
  })
}, mapStateToProps)(UpdateUserPasswordForm);
