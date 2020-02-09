import { combineReducers } from '@reduxjs/toolkit';
import { reducer as newDragon } from './newDragon';

const rootReducer = combineReducers({ newDragon });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
