import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Root from './components/Root';
import { fetchAuthenticated } from './actions/account';
import './index.css';

// External fixes:
// https://github.com/jhen0409/react-native-debugger/issues/280
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root'),
  );
});
