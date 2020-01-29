import React, { Component, FormEvent } from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';
import { BACKEND } from '../config';

export default class AccountDragonRow extends Component<any> {
  state = {
    nickname: this.props.dragon.nickname,
    isPublic: this.props.dragon.isPublic,
    saleValue: this.props.dragon.saleValue,
    sireValue: this.props.dragon.sireValue,
    edit: false,
  };

  updateNickname = (event: FormEvent) => {
    this.setState({ nickname: event.target.value });
  };
  updateSaleValue = (event: FormEvent) => {
    this.setState({ saleValue: event.target.value });
  };
  updateSireValue = (event: FormEvent) => {
    this.setState({ sireValue: event.target.value });
  };
  updateIsPublic = (event: FormEvent) => {
    this.setState({ isPublic: event.target.checked });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  cancel = () => {
    this.setState({
      edit: !this.state.edit,
      nickname: this.props.dragon.nickname,
      saleValue: this.props.dragon.saleValue,
      sireValue: this.props.dragon.sireValue,
    });
  };

  save = () => {
    // if (this.state.nickname === this.props.dragon.nickname) {
    //   this.toggleEdit();
    // } else {
    fetch(`${BACKEND.ADDRESS}/dragon/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dragonId: this.props.dragon.dragonId,
        nickname: this.state.nickname,
        isPublic: this.state.isPublic,
        saleValue: this.state.saleValue,
        sireValue: this.state.sireValue,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          alert(json.message);
        } else {
          this.toggleEdit();
        }
      })
      .catch(error => alert(error.message));
    // }
  };
  get SaveButton() {
    return (
      <div>
        <Button className='button-padding' onClick={this.save}>
          Save
        </Button>
        <Button className='button-padding' onClick={this.cancel}>
          Cancel
        </Button>
      </div>
    );
  }

  get EditButton() {
    return (
      <Button className='button-padding' onClick={this.toggleEdit}>
        Edit
      </Button>
    );
  }

  render() {
    return (
      <div>
        {/* <div>{this.props.dragon.nickname}</div> */}
        <input
          type='text'
          value={this.state.nickname}
          onChange={this.updateNickname}
          disabled={!this.state.edit}
          style={{ backgroundColor: !this.state.edit ? 'silver' : '' }}
        />
        <div>
          <span>
            <span>Sale Value: </span>
            <input
              type='number'
              disabled={!this.state.edit}
              value={this.state.saleValue}
              onChange={this.updateSaleValue}
              className='account-dragon-row-input'
            />
            <br />
            <span>Sire Value: </span>
            <input
              type='number'
              disabled={!this.state.edit}
              value={this.state.sireValue}
              onChange={this.updateSireValue}
              className='account-dragon-row-input'
            />
          </span>
          <br />
          <text>Public </text>
          <input
            type='checkbox'
            disabled={!this.state.edit}
            checked={this.state.isPublic}
            onChange={this.updateIsPublic}
          />
          <DragonAvatar dragon={this.props.dragon} />
          {this.state.edit ? this.SaveButton : this.EditButton}
        </div>
        <br />
      </div>
    );
  }
}
