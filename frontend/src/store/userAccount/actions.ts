import { actions } from './';
import api from '../api';
import { convertAPIDragonToStoreDragon } from 'store/dragon';

const updateJwt = (jwt: string): void => {
  Object.assign(api.defaults, {
    headers: { authorization: `Bearer ${jwt}` },
  });
};

const signUp = (username: string, password: string) => async dispatch => {
  dispatch(actions.fetch());
  try {
    const { data } = await api.post<APIResponse.SignUp>('account/signup', {
      username,
      password,
    });
    updateJwt(data.jwt);
    dispatch(actions.fetchSignInSuccess(data));
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const logOut = () => async dispatch => {
  const response = await api.get<OkResponse>('account/logout');
  if (response.data.ok) {
    dispatch(actions.fetchLogoutSuccess());
  } else {
    dispatch(actions.fetchError({ message: 'failed to logout' }));
  }
};

const logIn = (username: string, password: string) => async dispatch => {
  dispatch(actions.fetch());
  try {
    const { data } = await api.post<APIResponse.Login>('account/login', {
      username,
      password,
    });
    updateJwt(data.jwt);
    dispatch(actions.fetchSignInSuccess(data));
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const fetchAccountDragons = () => async dispatch => {
  dispatch(actions.fetch());
  try {
    const response = await api.get<{ dragons: APIResponse.Dragon[] }>(
      'account/dragons',
    );
    const { dragons } = response.data;
    dispatch(
      actions.fetchDragonsSuccess(dragons.map(convertAPIDragonToStoreDragon)),
    );
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const fetchAccountInfo = () => async dispatch => {
  dispatch(actions.fetch());
  try {
    const response = await api.get<UserAccountResponse>('account/info');
    dispatch(actions.fetchInfoSuccess(response.data));
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

export { signUp, logOut, logIn, fetchAccountInfo, fetchAccountDragons };
