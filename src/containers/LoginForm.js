import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/'
import classNames from 'classnames';

class LoginForm extends React.Component {

  renderErrors(){
    if (this.props.error) {
      return <div className="alert alert-danger">
        {JSON.stringify(this.props.error)}
      </div>
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.userData && nextProps.userData !== this.props.userData && this.props.onLoginSuccess ) {
      this.props.onLoginSuccess()
    }
    
  }


  render() {
    return (
      <div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" ref="email" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" ref="password" className="form-control"/>
        </div>
        
          <button className={classNames('btn', {'btn-danger':this.props.loading})} onClick={this.onClick.bind(this)}>Login</button>
          
          { this.renderErrors() }  
      </div>
      
      
    )
  }

  onClick(e){
    e.preventDefault()
    this.props.login({
      email: this.refs.email.value,
      password: this.refs.password.value
    })
  };

}

function mapStateToProps(state, ownProps) {

  return {
    loading : state.auth.loading,
    error : state.auth.error,
    userData : state.auth.user,
  }
}



export default connect(mapStateToProps, {login})(LoginForm);
