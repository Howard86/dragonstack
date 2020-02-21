import React, { useEffect, FC } from 'react';
import { render } from 'react-dom';

import { Provider, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

// Components
import Root from 'pages/Root';
import AccountDragons from 'components/AccountDragons';
import PublicDragons from 'components/PublicDragons';

import './index.css';
import customStore from 'store';
import { authenticateAction } from 'store/userAccount/actions';
import NavBar from './components/NavBar';

const AuthRoute = props => {
  const { component, path } = props;
  const { loggedIn } = customStore.getState().userAccount;

  return loggedIn ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: '/' }} />
  );
};

// TODO: Fix dispatch type
customStore.dispatch<any>(authenticateAction()).then(() => {
  render(
    <Provider store={customStore}>
      <Router>
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

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticateAction());
  }, []);

  return (
    <Provider store={customStore}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Root} />
          <AuthRoute path='/account-dragons' component={AccountDragons} />
          <AuthRoute path='/public-dragons' component={PublicDragons} />
        </Switch>
      </Router>
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
