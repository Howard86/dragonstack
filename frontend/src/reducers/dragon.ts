import { DRAGON } from '../actions/types';
import { fetchStates, ActionProps } from './fetchStates';

const DEFAULT_DRAGON = {
  dragon: {
    dragonId: '',
    generationId: '',
    nickname: '',
    birthdate: '',
    traits: [],
  },
};

const dragonReducer = (state = DEFAULT_DRAGON, action: ActionProps) => {
  switch (action.type) {
    case DRAGON.FETCH:
      return { ...state, status: fetchStates.fetching };
    case DRAGON.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case DRAGON.FETCH_SUCCESS:
      return { ...state, status: fetchStates.success, ...action.dragon };
    default:
      return state;
  }
};

export default dragonReducer;
