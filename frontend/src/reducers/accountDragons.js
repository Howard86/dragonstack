import { ACCOUNT_DRAGONS } from '../actions/types';
import fetchSates from './fetchStates';

const DEFAULT_ACCOUNT_DRAGONS = { dragons: [] };

const accountDragons = (state = DEFAULT_ACCOUNT_DRAGONS, action) => {
  switch (action.type) {
    case ACCOUNT_DRAGONS.FETCH:
      return { ...state, status: fetchSates.fetching };
    case ACCOUNT_DRAGONS.FETCH_ERROR:
      return { ...state, status: fetchSates.error, message: action.message };
    case ACCOUNT_DRAGONS.FETCH_SUCCESS:
      return { ...state, status: fetchSates.success, dragons: action.dragons };
    default:
      return state;
  }
};

export default accountDragons;
