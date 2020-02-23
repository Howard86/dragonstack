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

const updateDragon = async (params: DragonProperty & { dragonId: number }) => {
  try {
    const response = await axios.put<DragonProperty & { dragonId: number }>(
      `${BACKEND.ADDRESS}/dragon/update`,
      params,
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const mateDragon = async (matronDragonId: number, patronDragonId: number) => {
  if (matronDragonId === patronDragonId) {
    return alert('You cannot breed with the same dragon!');
  }
  try {
    const response = await axios.post(
      `${BACKEND.ADDRESS}/dragon/mate`,
      { matronDragonId, patronDragonId },
      { withCredentials: true },
    );
    if (response.status >= 400) {
      // history.push('/account-dragons');
      return null;
    }
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const buyDragon = async (dragonId: number, saleValue: number) => {
  try {
    const response = await axios.post(
      `${BACKEND.ADDRESS}/dragon/buy`,
      { dragonId, saleValue },
      { withCredentials: true },
    );
    if (response.status >= 400) {
      // history.push('/account-dragons');
      return null;
    }
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export { getNewDragon, getPublicDragons, updateDragon, mateDragon, buyDragon };
