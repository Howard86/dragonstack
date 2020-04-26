import { actions } from './';
import api from '../api';

const fetchGeneration = () => async dispatch => {
  dispatch(actions.fetch());
  try {
    const response = await api.get<Generation>('generation');
    dispatch(actions.fetchSuccess(response.data));
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};
export { fetchGeneration };
