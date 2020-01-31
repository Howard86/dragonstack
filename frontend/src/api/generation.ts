import axios from 'axios';
import { BACKEND } from '../config';
import handleRequestError from './helper';

// TODO: Add interface

const getNewGeneration = async () => {
  try {
    const response = await axios.get(`${BACKEND.ADDRESS}/generation`);
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export { getNewGeneration };
