import { AppThunkDispatch } from 'store';
import { ActionCreator } from 'redux';
import {
  signup,
  logout,
  login,
  fetchAuthenticated,
  fetchAccountDragons,
  fetchAccountInfo,
} from 'api/account';
import { actions } from './index';

// TODO: Fix AppThunk Types
// const userAccountAction = (
//   apiFunction: (params?: any) => Promise<AxiosResponse>,
//   successAction: () => any,
//   params?: any,
// ) => () => async (dispatch: AppThunkDispatch<null>) => {
//   dispatch(actions.fetch());
//   try {
//     const response = await apiFunction(...params);
//     if (response.status >= 400) {
//       dispatch(actions.fetchError({ message: response.statusText }));
//     } else {
//       dispatch((actions as any).successAction());
//     }
//   } catch (error) {
//     const { message } = error;
//     dispatch(actions.fetchError({ message }));
//   }
// };

const signupAction = (username: string, password: string) => async (
  dispatch: AppThunkDispatch<null>,
) => {
  dispatch(actions.fetch());
  try {
    const response = await signup(username, password);
    if (response.status >= 400) {
      dispatch(actions.fetchError({ message: response.statusText }));
    } else {
      dispatch(actions.fetchSignInSuccess());
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const logoutAction = () => async (dispatch: AppThunkDispatch<null>) => {
  dispatch(actions.fetch());
  try {
    const response = await logout();
    if (response.status >= 400) {
      dispatch(actions.fetchError({ message: response.statusText }));
    } else {
      dispatch(actions.fetchLogoutSuccess());
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const loginAction = (username: string, password: string) => async (
  dispatch: AppThunkDispatch<null>,
) => {
  dispatch(actions.fetch());
  try {
    const response = await login(username, password);
    if (response.status >= 400) {
      dispatch(actions.fetchError({ message: response.statusText }));
    } else {
      dispatch(actions.fetchSignInSuccess());
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const authenticateAction = () => async (dispatch: ActionCreator<null>) => {
  dispatch(actions.fetch());
  try {
    const response = await fetchAuthenticated();
    if (response.status >= 400) {
      dispatch(actions.fetchError({ message: response.statusText }));
    } else {
      dispatch(actions.fetchSignInSuccess());
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const getAccountDragonsAction = () => async (
  dispatch: AppThunkDispatch<null>,
) => {
  dispatch(actions.fetch());
  try {
    const response = await fetchAccountDragons();
    if (response.status >= 400) {
      dispatch(actions.fetchError({ message: response.statusText }));
    } else {
      const { dragons } = response.data;
      dispatch(actions.fetchDragonsSuccess(dragons));
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const getAccountInfoAction = () => async (dispatch: AppThunkDispatch<null>) => {
  dispatch(actions.fetch());
  try {
    const response = await fetchAccountInfo();
    if (response.status >= 400) {
      dispatch(actions.fetchError({ message: response.statusText }));
    } else {
      const { data } = response;
      dispatch(actions.fetchInfoSuccess({ ...data }));
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

export {
  signupAction,
  logoutAction,
  loginAction,
  authenticateAction,
  getAccountDragonsAction,
  getAccountInfoAction,
};
