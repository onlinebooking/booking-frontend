import React from 'react';
import { replace } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import { register, clearRegistration } from '../actions/registration';
import { rejectFormErrorsFromResponse } from '../utils/form';
import Spinner from '../components/Spinner';
import ErrorAlert from '../components/ErrorAlert';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock
} from 'react-bootstrap';
import {
  createValidator,
  withMessage,
  required,
  minLength,
  match,
  email as emailValidationRule
} from '../utils/validation';

function redirectGuest(props) {
  if (!props.isGuest) {
    props.replace('/');
  }
}

const submit = (values, dispatch) => {
  return dispatch(register(values)).then(rejectFormErrorsFromResponse);
};

class SignupPage extends React.Component {

  componentWillMount() {
    this.props.clearRegistration();
    redirectGuest(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isGuest !== this.props.isGuest) {
      redirectGuest(nextProps);
    }
  }

  render() {
    const { signupUser } = this.props;

    return signupUser
      ? this.renderWelcome()
      : this.renderForm();
  }

  renderWelcome() {
    const { signupUser: { name, email } } = this.props;
    return (
      <div className="container-fluid padding-top-20 text-center">
        <h1>Ciao {name}, benvenuto in Qando!</h1>
        <p>
          Ti sarà inviata una mail all'indirizzo {email}, apri il
          link al suo interno per confermare la registrazione a Qando!
        </p>
      </div>
    );
  }

  renderForm() {
    const {
      fields: { name, email, password, confirmedPassword },
      handleSubmit,
      signupError,
      submitting
    } = this.props

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

        <FormGroup
          controlId="formControlsPassword"
          validationState={(password.touched && password.error) ? 'error' : null}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" placeholder="Password" {...password} />
          {password.touched && password.error && <HelpBlock>{password.error}</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="formControlsConfirmedPassword"
          validationState={(confirmedPassword.touched && confirmedPassword.error) ? 'error' : null}
        >
          <ControlLabel>Conferma password</ControlLabel>
          <FormControl type="password" placeholder="Conferma password" {...confirmedPassword} />
          {confirmedPassword.touched && confirmedPassword.error && <HelpBlock>{confirmedPassword.error}</HelpBlock>}
        </FormGroup>

        {signupError && <ErrorAlert
          title={`Errore registrazione`}
          {...signupError}
        />}

        {
          submitting
          ? <Spinner />
          : <FormGroup>
              <Button type="submit">
              Registrati
              </Button>
            </FormGroup>
        }
      </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const isGuest = !state.auth.token;
  const signupError = state.registration.error;
  const signupUser = state.registration.userInfo;

  return {
    isGuest,
    signupError,
    signupUser
  };
}

export default reduxForm({
  form: 'signup',
  fields: ['name', 'email', 'password', 'confirmedPassword'],
  validate: createValidator({
    name: [required],
    email: [required, emailValidationRule],
    password: [required, minLength(5)],
    confirmedPassword: [
      required,
      withMessage(match('password'), 'La password inserita è diversa')
    ]
  })
}, mapStateToProps, { replace, clearRegistration })(SignupPage)
