import { combineReducers } from '@reduxjs/toolkit';
import { reducer as generation } from './generation';
import { reducer as dragon } from './dragon';
import { reducer as userAccount } from './userAccount';

const rootReducer = combineReducers({ dragon, generation, userAccount });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
