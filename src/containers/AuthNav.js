import React from 'react';
import { Button, Modal, OverlayTrigger, Navbar, Nav } from 'react-bootstrap';
import LoginForm from './LoginForm'
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { logout, showModalLogin, hideModalLogin } from '../actions/auth';

class AuthNav extends React.Component {

  renderNavNotLogged() {
    return (
      <Navbar.Form pullRight>
        <Button type="button" bsSize="small" onClick={this.props.showModalLogin}>Login</Button>
      </Navbar.Form>
    );
  }

  renderNavLogged() {
    return (
      <span>
        <Navbar.Form pullRight>
          <Button type="button" bsSize="small" onClick={this.props.logout}>Logout</Button>
        </Navbar.Form>
        <Navbar.Text pullRight>Signed in as {this.props.user.email}</Navbar.Text>
      </span>
    );
  }

  renderNavLoading() {
    const { token } = this.props;

    if (token) {
      return <Navbar.Text pullRight>Fetching you...</Navbar.Text>;
    }

    return <Navbar.Text pullRight>Login you...</Navbar.Text>;
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
      <span>
        {(() => {
          if (loading) {
            return this.renderNavLoading();
          }
          if (user) {
            return this.renderNavLogged();
          } else {
            return this.renderNavNotLogged();
          }
        })()}
        {this.renderModal()}
      </span>
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
})(AuthNav);
