import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import Generation from './components/Generation';
import Dragon from './components/Dragon';
import rootReducer from './reducers';

import './index.css';

// External fixes:
// https://github.com/jhen0409/react-native-debugger/issues/280
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <div>
      <h2>Dragon Stack from React</h2>
      <Generation />
      <Dragon />
    </div>
  </Provider>,
  document.getElementById('root'),
);
