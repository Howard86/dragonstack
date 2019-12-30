import generation from './generation';
import dragon from './dragon';
import account from './account';
import { combineReducers } from 'redux';

export default combineReducers({ account, generation, dragon });
