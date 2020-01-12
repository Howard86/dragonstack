import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions/account';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountInfo from './AccountInfo';

class NavBar extends Component {
  render() {
    return (
      <Container>
        <Navbar expand='md' sticky='top'>
          <Navbar.Brand>
            <Link to='/'>Dragon Stack</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {this.props.loggedIn && (
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='/account-dragons'>Account Dragons</Nav.Link>
                <Nav.Link href='/public-dragons'>Public Dragons</Nav.Link>
                <AccountInfo />
              </Nav>
              <Button onClick={this.props.logout}>Log out</Button>
            </Navbar.Collapse>
          )}
        </Navbar>
      </Container>
    );
  }
}

export default connect(({ account }) => ({ loggedIn: account.loggedIn }), {
  logout,
})(NavBar);
