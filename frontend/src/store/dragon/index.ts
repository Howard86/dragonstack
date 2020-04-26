import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStates } from 'constants/fetch';

export interface DragonState extends StateWise {
  newDragon: Dragon;
  publicDragons: Array<Dragon>;
}

const DEFAULT_DRAGON: DragonState = {
  status: FetchStates.INIT,
  newDragon: {
    dragonId: 0,
    generationId: 0,
    nickname: '',
    birthdate: '',
    traits: [],
    isPublic: false,
    saleValue: 0,
    sireValue: 0,
  },
  publicDragons: [
    {
      dragonId: 0,
      generationId: 0,
      nickname: '',
      birthdate: '',
      traits: [],
      isPublic: false,
      saleValue: 0,
      sireValue: 0,
    },
  ],
};

const convertAPIDragonToStoreDragon = (dragon: APIResponse.Dragon): Dragon => {
  const { id, generation, ...restDragon } = dragon;
  return {
    dragonId: id,
    generationId: generation.id,
    ...restDragon,
  };
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
    fetchNewDragonSuccess(draft, action: PayloadAction<APIResponse.Dragon>) {
      draft.status = FetchStates.SUCCESS;
      draft.newDragon = convertAPIDragonToStoreDragon(action.payload);
    },
    fetchPublicDragonsSuccess(
      draft,
      action: PayloadAction<APIResponse.Dragon[]>,
    ) {
      draft.status = FetchStates.SUCCESS;
      draft.publicDragons = action.payload.map(convertAPIDragonToStoreDragon);
    },
  },
});

const { actions, reducer } = dragonSlice;

export { reducer, actions };
