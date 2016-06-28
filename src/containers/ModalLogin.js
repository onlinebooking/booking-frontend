import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';
import { hideModalLogin } from '../actions/auth';

class ModalLogin extends Component {
  render() {
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
}

const mapStateToProps = (state) => ({
  showModal: state.auth.showModal,
});

export default connect(mapStateToProps, {
  hideModalLogin,
})(ModalLogin);
