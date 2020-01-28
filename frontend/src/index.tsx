import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import history from './history';
// Components
import NavBar from './components/NavBar';
import Root from './components/Root';
import AccountDragons from './components/AccountDragons';
import PublicDragons from './components/PublicDragons';

import { fetchAuthenticated } from './actions/account';
import './index.css';

// External fixes:
// https://github.com/jhen0409/react-native-debugger/issues/280
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

// const RedirectToAccountDragons = () => {
//   return <Redirect to={{ pathname: '/account-dragons' }} />;
// };

const AuthRoute = (props: { component: any; path: any }) => {
  if (!(store.getState().account as any).loggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  const { component, path } = props;
  return <Route path={path} component={component} />;
};

// TODO: Fix dispatch promise
store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Root} />
          <AuthRoute path='/account-dragons' component={AccountDragons} />
          <AuthRoute path='/public-dragons' component={PublicDragons} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
});
