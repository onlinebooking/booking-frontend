import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Spinner from '../components/Spinner';
import { rejectFormErrorsFromResponse } from '../utils/form';
import { updateUserData } from '../actions/user-profile';
import {
  createValidator,
  required,
  email as emailValidationRule
} from '../utils/validation';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
  Alert
} from 'react-bootstrap';

const submit = (values, dispatch) => {
  return dispatch(updateUserData(values)).then(rejectFormErrorsFromResponse);
};

class ProfilePage extends Component {
  render() {
    const {
      fields: { name, email },
      handleSubmit,
      submitting,
      showSuccessMessage
    } = this.props;

    return (
      <div className="container-fluid padding-top-20">
      <form onSubmit={handleSubmit(submit)} noValidate>

        <FormGroup
          controlId="formControlsName"
          validationState={(name.touched && name.error) ? 'error' : null}
        >
          <ControlLabel>Nome</ControlLabel>
          <FormControl type="text" placeholder="Nome" {...name} />
          {name.touched && name.error && <HelpBlock>{name.error}</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="formControlsEmail"
          validationState={(email.touched && email.error) ? 'error' : null}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" placeholder="Email" {...email} />
          {email.touched && email.error && <HelpBlock>{email.error}</HelpBlock>}
        </FormGroup>

        {
          submitting
          ? <Spinner />
          : <FormGroup>
              <Button type="submit">
              Modifica Profilo
              </Button>
            </FormGroup>
        }

        {showSuccessMessage && (
          <Alert bsStyle="success">
            Informazioni aggiornate correttamente.
          </Alert>
        )}
      </form>
      </div>
    );

  }
}

const mapStateToProps = (state) => ({
  initialValues: state.auth.user,
  showSuccessMessage: state.userData.profile.succesUpdateData,
});

export default reduxForm({
  form: 'profile',
  fields: ['name', 'email'],
  validate: createValidator({
    name: [required],
    email: [required, emailValidationRule],
  })
}, mapStateToProps)(ProfilePage);
