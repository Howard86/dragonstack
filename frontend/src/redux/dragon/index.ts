import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    fetch(draft): void {
      draft.status = FetchStates.FETCHING;
    },
    fetchError(draft, action: PayloadAction<{ message: string }>): void {
      draft.status = FetchStates.ERROR;
      draft.message = action.payload.message;
    },
    fetchNewDragonSuccess(draft, action: PayloadAction<Dragon>) {
      draft.status = FetchStates.SUCCESS;
      draft.newDragon = action.payload;
    },
    fetchPublicDragonsSuccess(draft, action: PayloadAction<Array<Dragon>>) {
      draft.status = FetchStates.SUCCESS;
      draft.publicDragons = action.payload;
    },
  },
});

const { actions, reducer } = dragonSlice;

export { reducer, actions };
