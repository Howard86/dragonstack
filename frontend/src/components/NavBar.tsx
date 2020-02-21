import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

import AccountInfo from 'components/Account/AccountInfo';
import { logoutAction } from 'store/userAccount/actions';
import { RootState } from 'store/reducers';

const NavBar = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(({ userAccount }: RootState) => userAccount);
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <Container>
      <Navbar expand='md' fixed='top' bg='light'>
        <Navbar.Brand>
          <Link to='/'>Dragon Stack</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {loggedIn && (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link>
                <Link to='/account-dragons'>Account Dragons</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/public-dragons'>Public Dragons</Link>
              </Nav.Link>
              <AccountInfo />
            </Nav>
            <Link to='/'>
              <Button className='button-padding' onClick={logout}>
                Log out
              </Button>
            </Link>
          </Navbar.Collapse>
        )}
      </Navbar>
    </Container>
  );
};

export default NavBar;
