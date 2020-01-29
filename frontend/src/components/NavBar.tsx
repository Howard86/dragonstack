import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions/account';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountInfo from './AccountInfo';
import { RootState } from '../reducers/index';

class NavBar extends Component<any> {
  handleLogOut() {
    this.props.logout;
  }

  render() {
    return (
      <Container>
        <Navbar expand='md' fixed='top' bg='light'>
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
              <Link to='/'>
                <Button className='button-padding' onClick={this.props.logout}>
                  Log out
                </Button>
              </Link>
            </Navbar.Collapse>
          )}
        </Navbar>
      </Container>
    );
  }
}

// TODO: Fix any
export default connect(
  ({ account }: RootState) => ({ loggedIn: (account as any).loggedIn }),
  {
    logout,
  },
)(NavBar);
