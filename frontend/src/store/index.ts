import {
  configureStore,
  Action,
  getDefaultMiddleware,
  Middleware,
} from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';

const isDev = process.env.NODE_ENV !== 'production';

const middleware: Array<Middleware> = [...getDefaultMiddleware<RootState>()];

if (isDev) {
  const { createLogger } = module.require('redux-logger');
  const logger = createLogger({
    duration: true,
    collapsed: (_getState: any, _action: any, logEntry: { error: any }) =>
      !logEntry.error,
    diff: true,
  });

  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  devTools: isDev,
  middleware,
});
if (isDev && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}
export default store;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppThunkDispatch<T> = ThunkDispatch<RootState, T, Action>;
