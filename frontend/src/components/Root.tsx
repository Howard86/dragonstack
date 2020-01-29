import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import AuthForm from './AuthForm';
import { RootState } from '../reducers/index';

export class Root extends Component<any> {
  render() {
    return this.props.account.loggedIn ? <Home /> : <AuthForm />;
  }
}

export default connect(({ account }: RootState) => ({ account }), null)(Root);
