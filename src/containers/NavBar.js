import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
          <NavDropdown eventKey={1} title="Le mie prenotazioni" id="bookings-nav-dropdown">
            <MenuItem
              eventKey={1.1}
              href="/my-bookings/incoming"
              to="/my-bookings/incoming"
              componentClass={Link}
            >Future</MenuItem>
            <MenuItem
              eventKey={1.2}
              href="/my-bookings/history"
              to="/my-bookings/history"
              componentClass={Link}
            >Archivio</MenuItem>
          </NavDropdown>
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
