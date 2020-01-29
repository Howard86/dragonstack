import React, { Component } from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import { Jumbotron } from 'react-bootstrap';

export class Home extends Component<any> {
  render() {
    return (
      <>
        <Jumbotron>
          <h1>Dragon Stack from React</h1>
          <Generation />
        </Jumbotron>
        <Dragon />
      </>
    );
  }
}

export default Home;
