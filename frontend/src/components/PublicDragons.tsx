import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragons } from '../actions/publicDragon';
import { fetchAccountDragons } from '../actions/accountDragons';
import PublicDragonRow from './PublicDragonRow';
import { RootState } from '../reducers';

class PublicDragons extends Component<any> {
  componentDidMount() {
    this.props.fetchPublicDragons();
    this.props.fetchAccountDragons();
  }

  render() {
    return (
      <div>
        <h3>Public Dragons</h3>
        {this.props.publicDragons.dragons.map(
          (dragon: { dragonId: string | number | undefined }) => {
            return (
              <div key={dragon.dragonId}>
                <PublicDragonRow dragon={dragon} />
                <hr />
              </div>
            );
          },
        )}
      </div>
    );
  }
}

export default connect(({ publicDragons }: RootState) => ({ publicDragons }), {
  fetchPublicDragons,
  fetchAccountDragons,
})(PublicDragons);
