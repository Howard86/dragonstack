import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';

import { RootState } from 'store/reducers';
import { fetchAccountInfo } from 'store/userAccount/actions';

const { Header, Item, Divider } = NavDropdown;

const AccountInfo: FC = () => {
  const { username, balance } = useSelector(
    ({ userAccount }: RootState) => userAccount,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccountInfo());
  }, []);
  return (
    <NavDropdown title='Account Info' id='basic-nav-dropdown'>
      <Header>Username</Header>
      <Item>{username}</Item>
      <Divider />
      <Item>
        Balance:
        {balance}
      </Item>
    </NavDropdown>
  );
};

export default AccountInfo;
