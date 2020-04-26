import { actions } from './index';
import api from '../api';

const fetchNewDragon = () => async dispatch => {
  dispatch(actions.fetch());
  try {
    const response = await api.get<APIResponse.Dragon>('dragon/new');
    dispatch(actions.fetchNewDragonSuccess(response.data));
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const fetchPublicDragons = () => async dispatch => {
  dispatch(actions.fetch());
  try {
    const response = await api.get<APIResponse.Dragon[]>(
      'dragon/public-dragons',
    );
    dispatch(actions.fetchPublicDragonsSuccess(response.data));
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

export { fetchNewDragon, fetchPublicDragons };
