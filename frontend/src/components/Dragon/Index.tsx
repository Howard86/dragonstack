import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';
import { RootState } from 'store/reducers';
import { getNewDragonAction } from 'store/dragon/actions';
import DragonAvatar from './DragonAvatar';
import { FetchStates } from 'constants/fetch';

const DragonView: FC = () => {
  const { status, message, newDragon } = useSelector(
    ({ dragon }: RootState) => dragon,
  );

  const isError = status === FetchStates.ERROR;

  const dispatch = useDispatch();
  const getNewDragon = useCallback(() => {
    dispatch(getNewDragonAction());
  }, [dispatch]);

  return (
    <>
      <Button className='button-padding' onClick={getNewDragon}>
        New Dragon
      </Button>
      <br />
      {isError ? <span>{message}</span> : <DragonAvatar {...newDragon} />}
    </>
  );
};

export default DragonView;
