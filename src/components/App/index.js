import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import logo from './logo.svg';
import './style.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class App extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div className= {classnames('App', className)} {...props}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Output</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Profile</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Top Artists</MenuItem>
              <MenuItem eventKey={3.2}>Top Tracks</MenuItem>
              <MenuItem divider />
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>Hello World</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
