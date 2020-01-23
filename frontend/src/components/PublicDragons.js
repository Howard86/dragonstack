import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragons } from '../actions/publicDragon';
import { fetchAccountDragons } from '../actions/accountDragons';
import PublicDragonRow from './PublicDragonRow';

class PublicDragons extends Component {
  componentDidMount() {
    this.props.fetchPublicDragons();
    this.props.fetchAccountDragons();
  }

  render() {
    return (
      <div>
        <h3>PublicDragons</h3>
        {this.props.publicDragons.dragons.map(dragon => {
          return (
            <div key={dragon.dragonId}>
              <PublicDragonRow dragon={dragon} />
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(({ publicDragons }) => ({ publicDragons }), {
  fetchPublicDragons,
  fetchAccountDragons,
})(PublicDragons);
