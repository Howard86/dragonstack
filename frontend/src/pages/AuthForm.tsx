import React, { FC, FormEvent, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { logIn, signUp } from 'store/userAccount/actions';

const AuthForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const dispatch = useDispatch();

  const updateUsername = (event: FormEvent<HTMLInputElement>) =>
    setUsername(event.currentTarget.value);

  const updatePassword = (event: FormEvent<HTMLInputElement>) =>
    setPassword(event.currentTarget.value);

  const handleSignUp = useCallback(() => {
    setButtonClicked(true);
    dispatch(signUp(username, password));
  }, [username, password]);

  const handleLogIn = useCallback(() => {
    setButtonClicked(true);
    dispatch(logIn(username, password));
  }, [username, password]);

  return (
    <>
      <h2>Dragon Stack</h2>
      <FormGroup>
        <FormControl
          type='text'
          value={username}
          placeholder='username'
          onChange={updateUsername}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type='password'
          value={password}
          placeholder='password'
          onChange={updatePassword}
        />
      </FormGroup>
      <div>
        <Button className='button-padding' onClick={handleLogIn}>
          Log in
        </Button>
        <span> or </span>
        <Button className='button-padding' onClick={handleSignUp}>
          Sign up
        </Button>
      </div>
      <br />
      {/* {this.Error && (
        <div className='alert alert-danger' role='alert'>
          {this.Error}
        </div>
      )} */}
    </>
  );
};

export default AuthForm;
