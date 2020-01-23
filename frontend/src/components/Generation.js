import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/generation';
import fetchStates from '../reducers/fetchStates';
import moment from 'moment';

const MINIMUN_DELAY = 3000;

class Generation extends Component {
  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchNextGeneration = () => {
    this.props.fetchGeneration();

    let delay =
      new Date(this.props.generation.expiration).getTime() -
      new Date().getTime();

    if (delay < MINIMUN_DELAY) {
      delay = MINIMUN_DELAY;
    }

    this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
  };

  render() {
    const { generation } = this.props;

    // Use moment.js to format time message
    const expirationTime = moment(new Date(generation.expiration)).format(
      'h:mm:ss a',
    );

    if (generation.status === fetchStates.error) {
      return <div>{generation.message}</div>;
    }
    return (
      <div className='card'>
        <div className='card-heading'>
          <h3 className='card-title'>Generation {generation.generationId}</h3>
        </div>
        <div className='card-body'>
          <h4>Expires at {expirationTime}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const generation = state.generation;

  return { generation };
};

const componentConnector = connect(mapStateToProps, { fetchGeneration });

export default componentConnector(Generation);
