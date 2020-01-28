import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BACKEND } from '../config';
import history from '../history';
import { RootState } from '../reducers';

class MatingOptions extends Component<{ patronDragonId: string }> {
  mate = ({
    matronDragonId,
    patronDragonId,
  }: {
    matronDragonId: string;
    patronDragonId: string;
  }) => () => {
    if (matronDragonId === patronDragonId)
      return alert('You cannot breed with the same dragon!');

    fetch(`${BACKEND.ADDRESS}/dragon/mate`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matronDragonId, patronDragonId }),
    })
      .then(response => response.json())
      .then(json => {
        alert(json.message);

        if (json.type !== 'error') {
          history.push('/account-dragons');
        }
      })
      .catch(error => alert(error.message));
  };
  // TODO: Fix any
  render() {
    return (
      <div>
        <h4>Pick one of your dragons to mate with:</h4>
        {(this.props as any).accountDragons.dragons.map(
          (dragon: {
            dragonId: string;
            generationId: string;
            nickname: string;
          }) => {
            const { dragonId, generationId, nickname } = dragon;

            return (
              <span key={dragonId}>
                <Button
                  onClick={this.mate({
                    patronDragonId: this.props.patronDragonId,
                    matronDragonId: dragonId,
                  })}
                >
                  G{generationId}.I{dragonId}. {nickname}
                </Button>
              </span>
            );
          },
        )}
      </div>
    );
  }
}

export default connect(
  ({ accountDragons }: RootState) => ({ accountDragons }),
  null,
)(MatingOptions);
