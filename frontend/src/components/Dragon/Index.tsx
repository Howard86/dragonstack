import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';
import { RootState } from 'store/reducers';
import { fetchNewDragon } from 'store/dragon/actions';
import DragonAvatar from './DragonAvatar';
import { FetchStates } from 'constants/fetch';

const DragonView: FC = () => {
  const { status, message, newDragon } = useSelector(
    ({ dragon }: RootState) => dragon,
  );
  const dispatch = useDispatch();
  const isError = status === FetchStates.ERROR;

  return (
    <>
      <Button
        className='button-padding'
        onClick={() => dispatch(fetchNewDragon())}
      >
        New Dragon
      </Button>
      <br />
      {isError ? <span>{message}</span> : <DragonAvatar {...newDragon} />}
    </>
  );
};

export default DragonView;
