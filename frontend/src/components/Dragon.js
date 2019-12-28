import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDragon } from '../actions/dragon';
import fetchStates from '../reducers/fetchStates';

import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

class Dragon extends Component {
  // componentDidMount() {
  //   this.props.fetchDragon();
  // }

  render() {
    console.log('this.props', this.props);

    const { dragon } = this.props;

    // if (dragon.status === fetchStates.fetching) {
    //   return <div>...</div>;
    // }

    if (dragon.status === fetchStates.error) {
      return <div>{dragon.message}</div>;
    }
    return (
      <div>
        <Button onClick={this.props.fetchDragon}>New Dragon</Button>
        <DragonAvatar dragon={dragon} />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const dragon = state.dragon;
//   return { dragon };
// };

const componentConnector = connect(({ dragon }) => ({ dragon }), {
  fetchDragon,
});

export default componentConnector(Dragon);
