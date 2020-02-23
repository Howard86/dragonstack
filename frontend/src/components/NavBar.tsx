import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar as ReactNavBar,
  Nav,
  Button,
  Container,
  NavItem,
} from 'react-bootstrap';

import AccountInfo from 'components/Account/AccountInfo';
import { logoutAction } from 'store/userAccount/actions';
import { RootState } from 'store/reducers';

const { Brand, Toggle, Collapse } = ReactNavBar;

const NavBar = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(({ userAccount }: RootState) => userAccount);
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <Container>
      <ReactNavBar expand='md' fixed='top' bg='light'>
        <Brand>
          <Link to='/'>Dragon Stack</Link>
        </Brand>
        <Toggle aria-controls='basic-navbar-nav' />
        {loggedIn && (
          <Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <NavItem>
                <Link to='/account-dragons'>Account Dragons</Link>
              </NavItem>
              <NavItem>
                <Link to='/public-dragons'>Public Dragons</Link>
              </NavItem>
              <AccountInfo />
            </Nav>
            <Link to='/'>
              <Button className='button-padding' onClick={logout}>
                Log out
              </Button>
            </Link>
          </Collapse>
        )}
      </ReactNavBar>
    </Container>
  );
};

export default NavBar;
