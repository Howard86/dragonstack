import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { fetchAccountInfo } from '../actions/accountInfo';

class AccountInfo extends Component {
  componentDidMount() {
    this.props.fetchAccountInfo();
  }

  render() {
    return (
      <NavDropdown title='Account Info' id='basic-nav-dropdown'>
        <NavDropdown.Header>Username</NavDropdown.Header>
        <NavDropdown.Item>{this.props.accountInfo.username}</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          Balance: {this.props.accountInfo.balance}
        </NavDropdown.Item>
      </NavDropdown>
    );
  }
}

export default connect(({ accountInfo }) => ({ accountInfo }), {
  fetchAccountInfo,
})(AccountInfo);
