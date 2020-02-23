import { AppThunkDispatch } from 'store';

import { getNewDragon, getPublicDragons } from 'api/dragon';
import { actions } from './index';

// ! Abstracted functions are too complicated
// const getDragonActions = (
//   apiFunction: () => Promise<AxiosResponse>,
//   fetchSuccess: ActionCreatorWithPayload<Dragon[] | Dragon, string>,
// ): AppThunk => () => async (dispatch: AppThunkDispatch<null>) => {
//   dispatch(actions.fetch());
//   try {
//     const response = await apiFunction();
//     if (response.status >= 400) {
//       dispatch(
//         actions.fetchError({
//           message: response.statusText,
//         }),
//       );
//     } else {
//       dispatch(fetchSuccess(response?.data?.dragon));
//     }
//   } catch (error) {
//     const { message } = error;
//     dispatch(actions.fetchError({ message }));
//   }
// };

// const getPublicDragonsAction = getDragonActions(
//   getPublicDragons,
//   actions.fetchPublicDragonsSuccess,
// );

// const getNewDragonAction = getDragonActions(
//   getNewDragon,
//   actions.fetchNewDragonSuccess,
// );

const getNewDragonAction = () => async (dispatch: AppThunkDispatch<null>) => {
  dispatch(actions.fetch());
  try {
    const response = await getNewDragon();
    const dragon = response?.data?.dragon;

    if (response.status >= 400) {
      dispatch(
        actions.fetchError({
          message: response.statusText,
        }),
      );
    } else if (dragon) {
      dispatch(actions.fetchNewDragonSuccess(dragon));
    } else {
      dispatch(
        actions.fetchError({ message: 'No Public Dragons are registered yet' }),
      );
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

const getPublicDragonsAction = () => async (
  dispatch: AppThunkDispatch<null>,
) => {
  dispatch(actions.fetch());
  try {
    const response = await getPublicDragons();
    const dragons = response?.data?.dragons;
    if (response.status >= 400) {
      dispatch(
        actions.fetchError({
          message: response.statusText,
        }),
      );
    } else if (dragons.length > 0) {
      dispatch(actions.fetchPublicDragonsSuccess(dragons));
    } else {
      dispatch(
        actions.fetchError({ message: 'No Public Dragons are registered yet' }),
      );
    }
  } catch (error) {
    const { message } = error;
    dispatch(actions.fetchError({ message }));
  }
};

export { getPublicDragonsAction, getNewDragonAction };
