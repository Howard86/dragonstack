import React, { useEffect, FC } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import Root from 'pages/Root';
import AccountDragons from 'components/AccountDragons/Index';
import PublicDragons from 'components/PublicDragons';
import NavBar from './components/NavBar';

import './index.css';
import customStore from 'store';
import { RootState } from 'store/reducers';
import { fetchAccountInfo } from 'store/userAccount/actions';

const AuthRoute = props => {
  const { component, path } = props;
  const { loggedIn } = useSelector(({ userAccount }: RootState) => userAccount);

  return loggedIn ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: '/' }} />
  );
};

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccountInfo());
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Root} />
        <AuthRoute path='/account-dragons' component={AccountDragons} />
        <AuthRoute path='/public-dragons' component={PublicDragons} />
      </Switch>
    </Router>
  );
};

render(
  <Provider store={customStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
