import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountDragons } from '../actions/accountDragons';
import AccountDragonRow from './AccountDragonRow';
import { RootState } from '../reducers/index';

class AccountDragons extends Component<any> {
  componentDidMount() {
    this.props.fetchAccountDragons();
  }

  render() {
    return (
      <div>
        <h3>Account Dragons</h3>
        {this.props.accountDragons.dragons.map(
          (dragon: { dragonId: string | number | undefined }) => {
            return (
              <div key={dragon.dragonId}>
                <AccountDragonRow dragon={dragon} />
                <hr />
              </div>
            );
          },
        )}
      </div>
    );
  }
}

export default connect(
  ({ accountDragons }: RootState) => ({ accountDragons }),
  {
    fetchAccountDragons,
  },
)(AccountDragons);
