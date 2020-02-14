import axios from 'axios';
import { BACKEND } from '../config';
import handleRequestError from './helper';

const signup = async (username: string, password: string) => {
  try {
    const response = await axios.post<UserAccount>(
      `${BACKEND.ADDRESS}/account/signup`,
      { username, password },
      {
        withCredentials: true,
        // validateStatus: status => status < 500,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axios.get<UserAccount>(
      `${BACKEND.ADDRESS}/account/logout`,
      {
        withCredentials: true,
        // validateStatus: status => status < 500,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post<UserAccount>(
      `${BACKEND.ADDRESS}/account/login`,
      { username, password },
      {
        withCredentials: true,
        // validateStatus: status => status < 500,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const fetchAuthenticated = async () => {
  try {
    const response = await axios.get<UserAccount>(
      `${BACKEND.ADDRESS}/account/authenticated`,
      {
        withCredentials: true,
        // validateStatus: status => status < 500,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const fetchAccountDragons = async () => {
  try {
    const response = await axios.get<Array<Dragon>>(
      `${BACKEND.ADDRESS}/account/dragons`,
      {
        withCredentials: true,
        // validateStatus: status => status < 500,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const fetchAccountInfo = async () => {
  try {
    const response = await axios.get<UserAccount>(
      `${BACKEND.ADDRESS}/account/info`,
      {
        withCredentials: true,
        // validateStatus: status => status < 500,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export {
  signup,
  login,
  logout,
  fetchAuthenticated,
  fetchAccountDragons,
  fetchAccountInfo,
};
