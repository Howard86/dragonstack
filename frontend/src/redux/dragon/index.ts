import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNewDragon } from 'api/dragon';
import { AppThunk, AppThunkDispatch } from 'redux/store';

// export interface DragonState extends Dragon {
//   status: FetchStates;
//   message?: string;
// }
export interface DragonState extends StateWise {
  newDragon?: Dragon;
  publicDragons?: Array<Dragon>;
}

const DEFAULT_DRAGON: DragonState = {
  status: FetchStates.INIT,
  newDragon: {
    dragonId: 0,
    generationId: 0,
    nickname: '',
    birthdate: '',
  },
  publicDragons: [
    {
      dragonId: 0,
      generationId: 0,
      nickname: '',
      birthdate: '',
    },
  ],
};

const dragonSlice = createSlice({
  name: 'dragon',
  initialState: DEFAULT_DRAGON,
  reducers: {
    fetch(state): void {
      state.status = FetchStates.FETCHING;
    },
    fetchError(state, action: PayloadAction<{ message: string }>): void {
      state.status = FetchStates.ERROR;
      state.message = action.payload.message;
    },
    fetchNewDragonSuccess(state, action: PayloadAction<Dragon>) {
      state.status = FetchStates.SUCCESS;
      state.newDragon = action.payload;
    },
    fetchPublicDragonsSuccess(state, action: PayloadAction<Array<Dragon>>) {
      state.status = FetchStates.SUCCESS;
      state.publicDragons = action.payload;
    },
  },
});

const { actions, reducer } = dragonSlice;

export { reducer, actions };
