import React from 'react';
import { Nav, Navbar, NavItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthNav from './AuthNav';
import { Link } from 'react-router';

class QandoNavBar extends React.Component {

  render() {
    const { authenticated, showAuthNav } = this.props;
    let userNav = null;

    if (authenticated) {
      userNav = (
        <Nav>
          <NavItem eventKey={1} componentClass={Link} href="/my-bookings" to="/my-bookings">Le mie prenotazioni</NavItem>
        </Nav>
      );
    }

    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Qando</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {userNav}
          {(() => {
            if (showAuthNav) {
              return <AuthNav />;
            }
          })()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const authenticated = !!state.auth.user;

  return {
    authenticated,
  };
}

export default connect(mapStateToProps)(QandoNavBar);
