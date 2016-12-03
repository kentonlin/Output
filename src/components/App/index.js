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
              <a href="/">Output</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/#/">Profile</NavItem>
            <NavItem eventKey={2} href="/#/search">Search</NavItem>
          </Nav>
        </Navbar>
        <h1>
          Search for your favorite artists and tracks and get lyrics
        </h1>
        <video id="background-video" loop autoPlay>
           <source src="https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/3267/6/166339049/530016355.mp4?token=583e6986_0xc0362811edab5fe4522baaf0efc34583d5def4ca" type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default App;
