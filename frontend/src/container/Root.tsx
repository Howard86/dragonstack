import React, { Component, FC } from 'react';
import Home from './Home';
import AuthForm from './AuthForm';

const Root: FC<{ loggedIn: boolean }> = ({ loggedIn }) =>
  loggedIn ? <Home /> : <AuthForm />;

export default Root;
