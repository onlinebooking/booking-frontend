import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import LoginModalButton from './LoginModalButton';

export class NavBar extends React.Component {

    render(){

        return (

            <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">OnlineBooking</a>
              </Navbar.Brand>
            </Navbar.Header>
            {/*
            <Nav>
              <NavItem eventKey={1} href="#">Link</NavItem>
              <NavItem eventKey={2} href="#">Link</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            */}
            <Navbar.Collapse>
            <Nav pullRight>
              
                <LoginModalButton></LoginModalButton>

            </Nav>
            </Navbar.Collapse>
          </Navbar>
        )





        return (<nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Home</a>
            </div>
            {/*
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                <li><a href="#">Link</a></li>
                
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
              </ul>
            </div> */
            }
          </div>
        </nav>)
    }
}