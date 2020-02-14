import React, { FC } from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import { Jumbotron } from 'react-bootstrap';

const Home: FC = () => (
  <>
    <Jumbotron>
      <h1>Dragon Stack from React</h1>
      <Generation />
    </Jumbotron>
    <Dragon />
  </>
);

export default Home;
