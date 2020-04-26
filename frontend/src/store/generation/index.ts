import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunkDispatch } from 'store';
import { getNewGeneration } from 'api/generation';
import { FetchStates } from 'constants/fetch';

export interface GenerationState extends StateWise, Generation {}

const DEFAULT_GENERATION: GenerationState = {
  status: FetchStates.INIT,
  id: 0,
  expiration: '',
};

const generationSlice = createSlice({
  name: 'generation',
  initialState: DEFAULT_GENERATION,
  reducers: {
    fetch(state): void {
      state.status = FetchStates.FETCHING;
    },
    fetchError(state, action: PayloadAction<{ message: string }>) {
      state.status = FetchStates.ERROR;
      state.message = action.payload.message;
    },
    fetchSuccess(_state, action: PayloadAction<Generation>) {
      return {
        status: FetchStates.SUCCESS,
        ...action.payload,
      };
    },
  },
});

const { reducer, actions } = generationSlice;

export { reducer, actions };
