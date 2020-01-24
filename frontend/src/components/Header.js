// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {
//   Navbar,
//   Nav,
//   NavDropdown,
//   Form,
//   FormControl,
//   Button,
// } from 'react-bootstrap';
// import AccountInfo from './AccountInfo';
// import { fetchAccountInfo } from '../actions/accountInfo';

// class Header extends Component {
//   componentDidMount() {
//     this.props.fetchAccountInfo();
//   }

//   render() {
//     return (
//       <div>
//         <AccountInfo accountInfo={this.props.accountInfo} />
//         <h3>Account Info</h3>
//         <div>Username: {this.props.accountInfo.username}</div>
//         <div>{this.props.accountInfo.balance}</div>
//         <Button onClick={this.props.logout} className='logout-button'>
//           Log out
//         </Button>
//       </div>
//     );
//   }
// }

// export default connect(({ accountInfo }) => ({ accountInfo }), {
//   fetchAccountInfo,
// })(Header);
