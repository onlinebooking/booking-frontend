import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout, showModalLogin } from '../actions/auth';

class QandoNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  render() {
    const { authenticated, loading } = this.props;
    let userNav = null;
    let guestNav = null;

    if (authenticated) {
      userNav = (
        <span>
          <Nav>
            <NavDropdown eventKey={3} title="Le mie prenotazioni" id="bookings-nav-dropdown">
              <MenuItem
                eventKey={3.1}
                onClick={() => this.setState({ expanded: false })}
                href="/my-bookings/incoming"
                to="/my-bookings/incoming"
                componentClass={Link}
              >Future</MenuItem>
              <MenuItem
                eventKey={3.2}
                onClick={() => this.setState({ expanded: false })}
                href="/my-bookings/history"
                to="/my-bookings/history"
                componentClass={Link}
              >Archivio</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem
              eventKey={4}
              onClick={() => this.setState({ expanded: false })}
            >Signed in as {this.props.user.email}</NavItem>
            <NavItem
              eventKey={5}
              onClick={() => {
                this.setState({ expanded: false });
                this.props.logout();
              }}
            >Logout</NavItem>
          </Nav>
        </span>
      );
    } else {
      guestNav = (
        <Nav pullRight>
          <NavItem
            eventKey={1}
            onClick={() => {
              this.setState({ expanded: false });
              this.props.showModalLogin();
            }}
          >Login</NavItem>
          <NavItem
            eventKey={2}
            onClick={() => this.setState({ expanded: false })}
            href="/signup"
            to="/signup"
            componentClass={Link}
          >Registrati</NavItem>
        </Nav>
      );
    }

    return (
      <Navbar inverse fixedTop
       expanded={this.state.expanded}
       onToggle={expanded => this.setState({ expanded })}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Qando</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {!loading && userNav}
          {!loading && guestNav}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { user, loading, token } = state.auth;
  const authenticated = !!user;

  return {
    user,
    authenticated,
    // Hide navabr only when ask for user data (tipically inital page loading)
    loading: (loading && token),
  };
}

export default connect(mapStateToProps, {
  showModalLogin,
  logout,
})(QandoNavBar);
