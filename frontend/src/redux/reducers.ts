import { combineReducers } from '@reduxjs/toolkit';
import { reducer as dragon } from './dragon';

const rootReducer = combineReducers({ dragon });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
