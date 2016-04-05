import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/';
import classNames from 'classnames';
import Spinner from '../components/Spinner';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
  }

  //componentWillReceiveProps(nextProps) {
    //if ( nextProps.userData && nextProps.userData !== this.props.userData && this.props.onLoginSuccess ) {
      //this.props.onLoginSuccess()
    //}
  //}

  renderErrors() {
    const { error, loading } = this.props;

    if (error && !loading) {
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

  render() {
    const { loading } = this.props;

    return (
      <form onSubmit={this.onLoginFormSubmit} noValidate>
        <div className="form-group">
          <label>Email</label>
          <input type="email" ref="email" disabled={loading} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" ref="password" disabled={loading} className="form-control"/>
        </div>
        {(() => {
          if (loading) {
            return <Spinner />;
          }

          return <button className="btn btn-primary">Login</button>;
        })()}
        {this.renderErrors()}
      </form>
    );
  }

  onLoginFormSubmit(e) {
    e.preventDefault();
    this.props.login({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, { login })(LoginForm);
