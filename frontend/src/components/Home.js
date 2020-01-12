import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Generation from './Generation';
import Dragon from './Dragon';
import AccountInfo from './AccountInfo';

export class Home extends Component {
  render() {
    return (
      <>
        <h2>Dragon Stack from React</h2>
        <Generation />
        <hr />
        <Dragon />
      </>
    );
  }
}

export default Home;
