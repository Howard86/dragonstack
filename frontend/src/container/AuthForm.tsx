import React, { Component, FC, FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import { signup, login } from '../actions/account';
import { fetchStates } from '../reducers/fetchStates';
import { RootState } from '../reducers';

const AuthForm1: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const updateUsername = (event: HTMLBodyElementEventMap) => setUsername(event);
};

export class AuthForm extends Component<any> {
  state = { username: '', password: '', buttonClicked: false };

  updateUsername = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ username: event.currentTarget.value });
  };

  updatePassword = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  signup = () => {
    const { username, password } = this.state;
    this.setState({ buttonClicked: true });

    this.props.signup({ username, password });
  };

  login = () => {
    const { username, password } = this.state;
    this.setState({ buttonClicked: true });

    this.props.login({ username, password });
  };

  get Error() {
    if (
      this.state.buttonClicked &&
      this.props.account.status === fetchStates.error
    ) {
      return <div>{this.props.account.message}</div>;
    }
  }

  render() {
    return (
      <div>
        <h2>Dragon Stack</h2>
        <FormGroup>
          <FormControl
            type='text'
            value={this.state.username}
            placeholder='username'
            onChange={this.updateUsername}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type='password'
            value={this.state.password}
            placeholder='password'
            onChange={this.updatePassword}
          />
        </FormGroup>
        <div>
          <Button className='button-padding' onClick={this.login}>
            Log in
          </Button>
          <span> or </span>
          <Button className='button-padding' onClick={this.signup}>
            Sign up
          </Button>
        </div>
        <br />
        {this.Error && (
          <div className='alert alert-danger' role='alert'>
            {this.Error}
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ account }: RootState) => ({ account }), {
  signup,
  login,
})(AuthForm);
