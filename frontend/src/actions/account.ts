import { ACCOUNT } from './types';
import { BACKEND } from '../config';

interface AccountParams {
  endpoint: string;
  options: any;
  FETCH_TYPE: string;
  SUCCESS_TYPE?: string;
  ERROR_TYPE: string;
}

interface AccountProps {
  username: string;
  password: string;
}
export const fetchFromAccount = ({
  endpoint,
  options,
  FETCH_TYPE,
  SUCCESS_TYPE,
  ERROR_TYPE,
}: AccountParams) => (
  dispatch: (arg0: { type?: string; message?: any }) => void,
) => {
  dispatch({ type: FETCH_TYPE });

  return fetch(`${BACKEND.ADDRESS}/account/${endpoint} `, options)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: ERROR_TYPE, message: json.message });
      } else {
        console.log('json', json);
        dispatch({ type: SUCCESS_TYPE, ...json });
      }
    })
    .catch(error => dispatch({ type: ERROR_TYPE, message: error.message }));
};

export const signup = ({ username, password }: AccountProps) =>
  fetchFromAccount({
    endpoint: 'signup',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
  });

export const logout = () =>
  fetchFromAccount({
    endpoint: 'logout',
    options: {
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS,
  });

export const login = ({ username, password }: AccountProps) =>
  fetchFromAccount({
    endpoint: 'login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
  });

export const fetchAuthenticated = () =>
  fetchFromAccount({
    endpoint: 'authenticated',
    options: {
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS,
  });
