import axios from 'axios';
import { BACKEND } from '../config';
import handleRequestError from './helper';

const getNewDragon = async () => {
  try {
    const response = await axios.get<{ dragon: Dragon }>(
      `${BACKEND.ADDRESS}/dragon/new`,
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

const getPublicDragons = async () => {
  try {
    const response = await axios.get<{ dragons: Array<Dragon> }>(
      `${BACKEND.ADDRESS}/dragon/public-dragons`,
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export { getNewDragon, getPublicDragons };
