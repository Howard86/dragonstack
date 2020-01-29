import { GENERATION } from './types';
import { BACKEND } from '../config';

export const fetchGeneration = () => (
  dispatch: (arg0: { type?: string; message?: any; generation?: any }) => void,
) => {
  dispatch({ type: GENERATION.FETCH });

  return fetch(`${BACKEND.ADDRESS}/generation`)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: GENERATION.FETCH_ERROR, message: json.message });
      } else {
        dispatch({
          type: GENERATION.FETCH_SUCCESS,
          generation: json.generation,
        });
      }
    })
    .catch(error =>
      dispatch({ type: GENERATION.FETCH_ERROR, message: error.message }),
    );
};
