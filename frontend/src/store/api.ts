import axios, { AxiosResponse } from 'axios';
import { BACKEND } from 'config';

const instance = axios.create({
  baseURL: `${BACKEND.ADDRESS}`,
  withCredentials: true,
});

const updateDragon = (
  params: DragonProperty & { dragonId: number },
): Promise<AxiosResponse<OkResponse>> => {
  return instance.put<OkResponse>('dragon/update', params);
};

const mateDragon = async (
  matronDragonId: number,
  patronDragonId: number,
): Promise<AxiosResponse<OkResponse>> => {
  if (matronDragonId === patronDragonId) {
    throw new Error('You cannot breed with the same dragon!');
  }

  return instance.post<OkResponse>('dragon/mate', {
    matronDragonId,
    patronDragonId,
  });
};

const buyDragon = (
  dragonId: number,
  saleValue: number,
): Promise<AxiosResponse<OkResponse>> => {
  return instance.post<OkResponse>('dragon/buy', {
    dragonId,
    saleValue,
  });
};

export default instance;
export { updateDragon, mateDragon, buyDragon };
