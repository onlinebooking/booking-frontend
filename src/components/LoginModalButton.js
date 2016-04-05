import React from 'react';
import { Button, Modal, OverlayTrigger, Navbar } from 'react-bootstrap';
import LoginForm from '../containers/LoginForm'
import { connect } from 'react-redux';
import { logout, showModalLogin, hideModalLogin } from '../actions';
import Spinner from './Spinner';

class LoginModalButton extends React.Component {

  renderBtnNotLogged() {
    return (
      <Navbar.Form>
      <Button type="button" bsSize="small" onClick={this.props.showModalLogin}>
        Login
      </Button>
      </Navbar.Form>
    );
  }

  renderBtnLogged() {
    return (
      <span>
        <Navbar.Text pullLeft>
          Signed in as {this.props.user.email}
        </Navbar.Text>
        <Navbar.Form pullLeft>
          <Button type="button" bsSize="small" navItem={true} onClick={this.props.logout}>
            Logout
          </Button>
        </Navbar.Form>
      </span>
    );
  }

  renderBtnLoading() {
    const { token } = this.props;

    if (token) {
      return <Navbar.Text pullLeft>Fetching you...</Navbar.Text>;
    }

    return <Navbar.Text pullLeft>Login you...</Navbar.Text>;
  }

  renderModal() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.hideModalLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hideModalLogin}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { user, loading } = this.props;

    return (
      <div>
        {(() => {
          if (loading) {
            return this.renderBtnLoading();
          }
          if (user) {
            return this.renderBtnLogged();
          } else {
            return this.renderBtnNotLogged();
          }
        })()}
        {this.renderModal()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.auth.user,
    token: state.auth.token,
    loading: state.auth.loading,
    showModal: state.auth.showModal,
  };
}

export default connect(mapStateToProps, {
  logout,
  showModalLogin,
  hideModalLogin,
})(LoginModalButton)
