import { combineReducers } from 'redux';
import generation from './generation';
import dragon from './dragon';
import account from './account';
import accountDragons from './accountDragons';
import accountInfo from './accountInfo';
import publicDragons from './publicDragons';

const rootReducer = combineReducers({
  account,
  generation,
  dragon,
  accountDragons,
  accountInfo,
  publicDragons,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
