import React, { FC } from 'react';
import Generation from 'components/Generation';
import Dragon from 'components/Dragon';
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
