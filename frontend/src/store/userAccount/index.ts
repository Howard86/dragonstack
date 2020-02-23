import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStates } from 'constants/fetch';

export interface UserAccountState extends UserAccount, StateWise {}

const DEFAULT_ACCOUNT: UserAccountState = {
  status: FetchStates.INIT,
  loggedIn: false,
  balance: 0,
  username: '',
};

const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState: DEFAULT_ACCOUNT,
  reducers: {
    fetch(draft) {
      draft.status = FetchStates.FETCHING;
    },
    fetchError(draft, action: PayloadAction<{ message: string }>) {
      draft.status = FetchStates.ERROR;
      draft.message = action.payload.message;
    },
    fetchSignInSuccess(draft) {
      draft.status = FetchStates.SUCCESS;
      draft.loggedIn = true;
    },
    fetchLogoutSuccess(draft) {
      draft.status = FetchStates.SUCCESS;
      draft.loggedIn = false;
    },
    fetchAuthenticationSuccess(
      draft,
      action: PayloadAction<{ authenticated: boolean }>,
    ) {
      draft.status = FetchStates.SUCCESS;
      draft.loggedIn = action.payload.authenticated;
    },
    fetchInfoSuccess(draft, action: PayloadAction<UserAccount>) {
      return {
        status: FetchStates.SUCCESS,
        loggedIn: true,
        ...action.payload,
      };
    },
    fetchDragonsSuccess(draft, action: PayloadAction<Array<Dragon>>) {
      draft.status = FetchStates.SUCCESS;
      draft.dragons = action.payload;
    },
  },
});

const { reducer, actions } = userAccountSlice;

export { reducer, actions };
