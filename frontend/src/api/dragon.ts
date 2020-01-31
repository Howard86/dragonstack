import axios from 'axios';
import { BACKEND } from '../config';
import handleRequestError from './helper';

interface DragonData {
  type: string;
  message: string;
  dragon: Dragon;
}

interface Dragon {
  dragonId: number;
  generationId: number;
  birthdate: string;
  nickname: string;
  traits: Array<TraitPair>;
  isPublic: false;
  saleValue: number;
  sireValue: number;
}

interface TraitPair {
  traitType: string;
  traitValue: string;
}

const getNewDragon = async () => {
  try {
    const response = await axios.get<DragonData>(
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
    const response = await axios.get<Array<DragonData>>(
      `${BACKEND.ADDRESS}/dragon/public-dragons`,
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export { getNewDragon, getPublicDragons };
