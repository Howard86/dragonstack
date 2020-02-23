import axios from 'axios';
import { BACKEND } from '../config';
import handleRequestError from './helper';

const getNewGeneration = async () => {
  try {
    const response = await axios.get<{ generation: Generation }>(
      `${BACKEND.ADDRESS}/generation`,
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export { getNewGeneration };
