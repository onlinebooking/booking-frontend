import React from 'react';
import { Button, Modal, OverlayTrigger, Navbar } from 'react-bootstrap';
import LoginForm from '../containers/LoginForm'
import { connect } from 'react-redux';
import { logout } from '../actions'

class LoginModalButton extends React.Component {

  constructor(props){
    super(props);
    this.state = { showModal: false };
  }
  

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  logout(){
    this.props.logout()
  }

  renderBtnNotLogged(){
    return (
    <Navbar.Form>
    <Button type="button" bsSize="small" navItem={true} onClick={this.open.bind(this)}>
      Login
    </Button>
    </Navbar.Form>
    )

  }

  renderBtnLogged(){
    return (
      <span>
        <Navbar.Text pullLeft>
          Signed in as {this.props.user.email}
        </Navbar.Text>
        
        <Navbar.Form pullLeft>
          <Button type="button" bsSize="small" navItem={true} onClick={this.logout.bind(this)}>
            Logout
          </Button>
        </Navbar.Form>
      
      </span>
    )
    
  }

  renderModal(){
    return (
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onLoginSuccess={this.close.bind(this)}></LoginForm>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal> 
    )
  }


  render(){
    
    if (this.props.user) {
      return (
        <span>
        { this.renderBtnLogged() }
        { this.renderModal() }
        </span>
      )
    }

    return  (
        <span>
        { this.renderBtnNotLogged() }
        { this.renderModal() }
        </span>
    )
  }
    
}

function mapStateToProps(state){
  return {
    user : state.auth.user,
    loading : state.auth.loading
  }
}


export default connect(mapStateToProps, { logout })(LoginModalButton)