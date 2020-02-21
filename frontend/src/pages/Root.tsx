import React, { FC } from 'react';
import Home from 'pages/Home';
import AuthForm from 'pages/AuthForm';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

const Root: FC = () => {
  const { loggedIn } = useSelector(({ userAccount }: RootState) => userAccount);
  return loggedIn ? <Home /> : <AuthForm />;
};

export default Root;
